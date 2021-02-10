import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Yup from 'yup';

import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';
import { DatabaseModule } from './database';

@Module({
  imports: [
    DatabaseModule,
    EnterpriseModule,
    FacilityModule,
    CustomerModule,
    ConfigModule.forRoot({
      validationSchema: Yup.object().shape({
        SERVER_PORT: Yup.number().required(),
        POSTGRES_HOST: Yup.string().required(),
        POSTGRES_PORT: Yup.number().required(),
        POSTGRES_USER: Yup.string().required(),
        POSTGRES_PASSWORD: Yup.string().required(),
        POSTGRES_DB: Yup.string().required(),
        RABBITMQ_USER: Yup.string().required(),
        RABBITMQ_PASSWORD: Yup.string().required(),
        RABBITMQ_HOST: Yup.string().required(),
        RABBITMQ_QUEUE_NAME: Yup.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
