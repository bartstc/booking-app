import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseRepository } from './adapter';
import { EnterpriseService } from './application/services';
import { CommandHandlers } from './application/commands/handlers';
import { EnterpriseSagas } from './application/sagas';
import {
  GetEnterpriseCase,
  GetEnterpriseController,
} from './application/useCases/getEnterprise';
import {
  CreateEnterpriseCase,
  CreateEnterpriseController,
} from './application/useCases/createEnterprise';
import {
  UpdateEnterpriseCase,
  UpdateEnterpriseController,
} from './application/useCases/updateEnterprise';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EnterpriseRepository])],
  controllers: [
    GetEnterpriseController,
    CreateEnterpriseController,
    UpdateEnterpriseController,
  ],
  providers: [
    ...CommandHandlers,
    EnterpriseSagas,
    EnterpriseService,
    GetEnterpriseCase,
    CreateEnterpriseCase,
    UpdateEnterpriseCase,
  ],
})
export class EnterpriseModule {}
