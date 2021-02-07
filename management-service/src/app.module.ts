import { Module } from '@nestjs/common';

import { DbModule } from './db.module';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';

@Module({
  imports: [DbModule, EnterpriseModule, FacilityModule, CustomerModule],
})
export class AppModule {}
