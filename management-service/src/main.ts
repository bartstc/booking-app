import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { corsOptionsDelegate } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors(corsOptionsDelegate);

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

  await app.listen(process.env.SERVER_PORT || 80);
}
bootstrap();
