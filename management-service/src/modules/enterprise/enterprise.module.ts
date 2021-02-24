import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { providers } from './enterprise.providers';
import { DatabaseModule } from '../../database';

import { CreateEnterpriseHandler } from './application/command/createEnterprise';
import { UpdateEnterpriseHandler } from './application/command/updateEnterprise';
import { GetEnterpriseHandler } from './application/query/getEnterprise';

import {
  CreateEnterpriseController,
  UpdateEnterpriseController,
} from './api/controllers/command';
import {
  GetEnterpriseController,
  GetEnterprisesController,
} from './api/controllers/query';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [
    CreateEnterpriseController,
    UpdateEnterpriseController,
    GetEnterpriseController,
    GetEnterprisesController,
  ],
  providers: [
    CreateEnterpriseHandler,
    UpdateEnterpriseHandler,
    GetEnterpriseHandler,
    ...providers,
  ],
  exports: [providers[0]],
})
export class EnterpriseModule {}
