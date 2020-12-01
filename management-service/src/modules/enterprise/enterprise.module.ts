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
import { GetEnterpriseController } from './application/query/getEnterprise';
import { AddFacilityHandler } from './application/eventHandlers/addFacility';
import { RemoveFacilityHandler } from './application/eventHandlers/removeFacility';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([EnterpriseRepository, EnterpriseQuery]),
  ],
  controllers: [
    CreateEnterpriseController,
    UpdateEnterpriseController,
    GetEnterpriseController,
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
