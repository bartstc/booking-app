import { Module, Provider } from '@nestjs/common';
import {
  Transport,
  ClientProxyFactory,
  ClientProxy,
} from '@nestjs/microservices';

import { RabbitMQService } from './rabbit.service';
import { InfrastructureKeys } from '../InfrastructureKeys';

const clientProxy: Provider = {
  provide: InfrastructureKeys.RabbitMQClientProxy,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
        ],
        queue: process.env.RABBITMQ_QUEUE_NAME,
        queueOptions: {
          durable: true,
        },
      },
    }),
};

const rabbitMQService: Provider = {
  provide: InfrastructureKeys.RabbitMQService,
  useFactory: (client: ClientProxy) => new RabbitMQService(client),
  inject: [InfrastructureKeys.RabbitMQClientProxy],
};

@Module({
  imports: [],
  controllers: [],
  providers: [clientProxy, rabbitMQService],
  exports: [rabbitMQService],
})
export class RabbitMQModule {}
