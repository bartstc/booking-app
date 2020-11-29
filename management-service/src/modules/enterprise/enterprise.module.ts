import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseQuery, EnterpriseRepository } from './infra';
import { EnterpriseSaga } from './application/saga';
import {
  CreateEnterpriseHandler,
  CreateEnterpriseController,
} from './application/useCases/createEnterprise';
import {
  UpdateEnterpriseHandler,
  UpdateEnterpriseController,
} from './application/useCases/updateEnterprise';
import { AddFacilityHandler } from './application/useCases/addFacility';
import { RemoveFacilityHandler } from './application/useCases/removeFacility';
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
})
export class EnterpriseModule {}
