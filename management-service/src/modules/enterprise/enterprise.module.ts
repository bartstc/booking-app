import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  CreateEnterpriseController,
  CreateEnterpriseHandler,
} from './application/command/createEnterprise';
import {
  UpdateEnterpriseController,
  UpdateEnterpriseHandler,
} from './application/command/updateEnterprise';
import { GetEnterpriseController } from './application/query/getEnterprise';
import { DbModule } from '../../db.module';
import { providers } from './enterprise.providers';

@Module({
  imports: [CqrsModule, DbModule],
  controllers: [
    CreateEnterpriseController,
    UpdateEnterpriseController,
    GetEnterpriseController,
  ],
  providers: [CreateEnterpriseHandler, UpdateEnterpriseHandler, ...providers],
  exports: [providers[0]],
})
export class EnterpriseModule {}
