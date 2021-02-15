import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { IConfigService } from './IConfigService';

@Injectable()
export class ConfigService implements IConfigService {
  constructor(private config: NestConfigService) {}

  get db() {
    return {
      host: this.config.get('POSTGRES_HOST'),
      port: this.config.get('POSTGRES_PORT'),
      username: this.config.get('POSTGRES_USER'),
      password: this.config.get('POSTGRES_PASSWORD'),
      database: this.config.get('POSTGRES_DB'),
    };
  }

  get logger() {
    return {
      level: this.config.get('LOGGER_LEVEL'),
    };
  }

  get amqp() {
    return {
      user: this.config.get('RABBITMQ_USER'),
      password: this.config.get('RABBITMQ_PASSWORD'),
      name: this.config.get('RABBITMQ_NAME'),
      host: this.config.get('RABBITMQ_HOST'),
      port: Number(this.config.get('RABBITMQ_PORT')),
      queue: this.config.get('RABBITMQ_QUEUE'),
      exchange: this.config.get('RABBITMQ_EXCHANGE'),
      exchangeType: this.config.get('RABBITMQ_EXCHANGE_TYPE'),
      reconnectDelay: Number(this.config.get('RABBITMQ_RECONNECT_DELAY')),
      prefetch: Number(this.config.get('RABBITMQ_PREFETCH')),
    };
  }
}
