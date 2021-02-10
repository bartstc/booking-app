import { Module } from '@nestjs/common';

import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';
import { DatabaseModule } from './database';
import { ConfigModule } from './config';

@Module({
  imports: [
    DatabaseModule,
    EnterpriseModule,
    FacilityModule,
    CustomerModule,
    ConfigModule,
  ],
})
export class AppModule {}
