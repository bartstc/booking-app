import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { providers } from './enterprise.providers';
import { DatabaseModule } from '../../database';

import { CreateEnterpriseHandler } from './application/command/createEnterprise';
import { UpdateEnterpriseHandler } from './application/command/updateEnterprise';
import { GetEnterpriseHandler } from './application/query/getEnterprise';
import { GetEnterpriseByOwnerIdHandler } from './application/query/getEnterpriseByOwnerId';

import {
  CreateEnterpriseController,
  UpdateEnterpriseController,
} from './api/controllers/command';
import {
  GetEnterpriseController,
  GetEnterprisesController,
  GetEnterpriseByOwnerIdController,
} from './api/controllers/query';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [
    CreateEnterpriseController,
    UpdateEnterpriseController,
    GetEnterpriseController,
    GetEnterprisesController,
    GetEnterpriseByOwnerIdController,
  ],
  providers: [
    CreateEnterpriseHandler,
    UpdateEnterpriseHandler,
    GetEnterpriseHandler,
    GetEnterpriseByOwnerIdHandler,
    ...providers,
  ],
  exports: [providers[0]],
})
export class EnterpriseModule {}
