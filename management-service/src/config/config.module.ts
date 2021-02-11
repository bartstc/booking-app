import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { Module, Provider } from '@nestjs/common';
import * as Yup from 'yup';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { ConfigService } from './config.service';

const configServiceProvider: Provider = {
  provide: InfrastructureKeys.ConfigService,
  inject: [NestConfigService],
  useFactory: async (configService: NestConfigService) =>
    new ConfigService(configService),
};

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: Yup.object().shape({
        SERVER_PORT: Yup.number().required(),
        POSTGRES_HOST: Yup.string().required(),
        POSTGRES_PORT: Yup.number().required(),
        POSTGRES_USER: Yup.string().required(),
        POSTGRES_PASSWORD: Yup.string().required(),
        POSTGRES_DB: Yup.string().required(),
        RABBITMQ_USER: Yup.string().required(),
        RABBITMQ_PASSWORD: Yup.string().required(),
        RABBITMQ_NAME: Yup.string().required(),
        RABBITMQ_HOST: Yup.string().required(),
        RABBITMQ_PORT: Yup.number().required(),
        RABBITMQ_QUEUE: Yup.string().required(),
        RABBITMQ_EXCHANGE: Yup.string().required(),
        RABBITMQ_EXCHANGE_TYPE: Yup.string().required(),
        RABBITMQ_RECONNECT_DELAY: Yup.string().required(),
        RABBITMQ_PREFETCH: Yup.string().required(),
        LOGGER_LEVEL: Yup.string().required(),
      }),
    }),
  ],
  providers: [configServiceProvider],
  exports: [configServiceProvider],
})
export class ConfigModule {}
