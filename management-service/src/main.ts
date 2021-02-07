import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Management Service API')
    .setDescription(
      `Service for managing a state of enterprise and it's resources`,
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);

  // await app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
  //     ],
  //     queue: process.env.RABBITMQ_QUEUE_NAME,
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
  // await app.startAllMicroservicesAsync();
  await app.listen(process.env.SERVER_PORT || 80);
}
bootstrap();
