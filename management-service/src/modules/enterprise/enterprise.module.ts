import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DbModule } from '../../db.module';
import { providers } from './enterprise.providers';

import { CreateEnterpriseHandler } from './application/command/createEnterprise';
import { UpdateEnterpriseHandler } from './application/command/updateEnterprise';
import { GetEnterpriseHandler } from './application/query/getEnterprise';

import {
  CreateEnterpriseController,
  UpdateEnterpriseController,
} from './api/controllers/command';
import { GetEnterpriseController } from './api/controllers/query';

@Module({
  imports: [CqrsModule, DbModule],
  controllers: [
    CreateEnterpriseController,
    UpdateEnterpriseController,
    GetEnterpriseController,
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
