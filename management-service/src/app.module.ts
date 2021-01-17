import { Module } from '@nestjs/common';

import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';
import { DbModule } from './db.module';

@Module({
  imports: [DbModule, EnterpriseModule, FacilityModule, CustomerModule],
})
export class AppModule {}
