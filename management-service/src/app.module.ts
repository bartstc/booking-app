import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from './ormconfig';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { FacilityModule } from './modules/facilities/facility.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), EnterpriseModule, FacilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
