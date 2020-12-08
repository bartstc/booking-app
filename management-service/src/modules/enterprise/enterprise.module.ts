import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseQuery, EnterpriseRepository } from './infra';
import {
  CreateEnterpriseHandler,
  CreateEnterpriseController,
} from './application/command/createEnterprise';
import {
  UpdateEnterpriseHandler,
  UpdateEnterpriseController,
} from './application/command/updateEnterprise';
import { GetEnterpriseController } from './application/query/getEnterprise';

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
  providers: [CreateEnterpriseHandler, UpdateEnterpriseHandler],
  exports: [TypeOrmModule.forFeature([EnterpriseRepository])],
})
export class EnterpriseModule {}
