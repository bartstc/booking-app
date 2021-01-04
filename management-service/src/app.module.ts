import { Module } from '@nestjs/common';

import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';
import { CustomerModule } from './modules/customers/customer.module';
import { DictionaryModule } from './modules/dictionaries/dictionary.module';
import { DbModule } from './db.module';

@Module({
  imports: [
    DbModule,
    EnterpriseModule,
    FacilityModule,
    CustomerModule,
    DictionaryModule,
  ],
})
export class AppModule {}
