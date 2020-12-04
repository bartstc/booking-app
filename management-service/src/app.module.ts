import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './ormconfig';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), EnterpriseModule, FacilityModule],
})
export class AppModule {}
