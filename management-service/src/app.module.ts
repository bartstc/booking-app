import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './ormconfig';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    EnterpriseModule,
    FacilityModule,
    CustomerModule,
  ],
})
export class AppModule {}
