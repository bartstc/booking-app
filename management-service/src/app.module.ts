import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { AmqpModule } from './amqp';
import { ConfigModule } from './config';
import { LoggerModule } from './logger';

import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    LoggerModule,
    AmqpModule,
    EnterpriseModule,
    FacilityModule,
    CustomerModule,
  ],
})
export class AppModule {}
