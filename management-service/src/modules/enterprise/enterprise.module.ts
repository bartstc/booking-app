import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseQuery, EnterpriseRepository } from './infra';
import { EnterpriseSaga } from './application/saga';
import {
  CreateEnterpriseHandler,
  CreateEnterpriseController,
} from './application/command/createEnterprise';
import {
  UpdateEnterpriseHandler,
  UpdateEnterpriseController,
} from './application/command/updateEnterprise';
import { AddFacilityHandler } from './application/command/addFacility';
import { RemoveFacilityHandler } from './application/command/removeFacility';
import { GetEnterpriseController } from './application/query/getEnterprise';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([EnterpriseRepository, EnterpriseQuery]),
  ],
  controllers: [
    GetEnterpriseController,
    CreateEnterpriseController,
    UpdateEnterpriseController,
  ],
  providers: [
    EnterpriseSaga,
    CreateEnterpriseHandler,
    UpdateEnterpriseHandler,
    AddFacilityHandler,
    RemoveFacilityHandler,
  ],
  exports: [TypeOrmModule.forFeature([EnterpriseRepository])],
})
export class EnterpriseModule {}
