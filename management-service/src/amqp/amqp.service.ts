import { Inject, Injectable } from '@nestjs/common';

import { Channel, connect as amqpConnect } from 'amqplib';

import { ILoggerService } from '../logger';
import { InfrastructureKeys } from '../InfrastructureKeys';
import { IConfigService } from '../config';
import { IAmqpService } from './IAmqpService';
import { MassTransitTransformer } from './MassTransitTransformer';

export interface AmqpOptions {
  exchange: string;
  routingKey: string;
  queue: string;
}

export type AmqpResponse = 'ack' | 'nack';
export type ExchangeType = 'direct' | 'fanout' | 'topic' | 'headers';

@Injectable()
export class AmqpService implements IAmqpService {
  public amqpChannel: Channel;

  constructor(
    @Inject(InfrastructureKeys.LoggerService)
    private readonly logger: ILoggerService,
    @Inject(InfrastructureKeys.ConfigService)
    private readonly config: IConfigService,
  ) {
    this.createChannel();
  }

  private createChannel() {
    this.connect().then((channel) => {
      this.logger.warn('Channel created');
      this.amqpChannel = channel;
      const config = this.config.amqp;

      this.amqpChannel.on('error', (err) => {
        this.logger.error(err);

        setTimeout(() => {
          this.createChannel();
        }, config.reconnectDelay);
      });

      this.amqpChannel.on('close', (_err) => {
        this.logger.warn('Channel closed');

        setTimeout(() => {
          this.createChannel();
        }, config.reconnectDelay);
      });

      this.amqpChannel
        .assertExchange(config.exchange, config.exchangeType, {
          durable: true,
        })
        .then((res) => {
          this.logger.warn(`AssertExchange ${res.exchange}`);

          // subscriptions.forEach(async (sub) => {
          //   await this.subscribeMessage(sub.options, sub.handler);
          // });
        });

      this.amqpChannel.prefetch(config.prefetch);
    });
  }

  private connect(): Promise<Channel> {
    const amqpUrl = `amqp://${this.config.amqp.user}:${this.config.amqp.password}@${this.config.amqp.host}:${this.config.amqp.port}`;

    return new Promise(async (resolve, _reject) => {
      try {
        const connection = await amqpConnect(amqpUrl);

        const channel = await connection.createChannel();

        resolve(channel);
      } catch (error) {
        setTimeout(() => {
          resolve(this.connect());
        }, this.config.amqp.reconnectDelay);
      }
    });
  }

  private async subscribeMessage(
    options: AmqpOptions,
    handler: (msg: unknown, logger?: ILoggerService) => Promise<AmqpResponse>,
  ) {
    try {
      const { queue } = await this.amqpChannel.assertQueue(options.queue || '');

      await this.amqpChannel.bindQueue(
        queue,
        options.exchange,
        options.routingKey,
      );

      this.logger.warn(`bindQueue - ${options.queue}`);

      await this.amqpChannel.consume(queue, async (msg) => {
        if (msg !== null) {
          const msgContent = msg.content.toString();

          this.logger.warn(msgContent, `Consume - ${options.routingKey}`);

          const message = JSON.parse(msgContent);

          const response = await handler(message, this.logger);

          if (response === 'nack') {
            this.amqpChannel.nack(msg, false, false);
          } else {
            this.amqpChannel.ack(msg, false);
          }
        }
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  public async sendMessage<T>(msg: T, key: string) {
    try {
      if (this.amqpChannel) {
        this.amqpChannel.publish(
          MassTransitTransformer.getExchangeName(key),
          key,
          Buffer.from(
            JSON.stringify(MassTransitTransformer.toMessage(msg, key)),
          ),
        );
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
