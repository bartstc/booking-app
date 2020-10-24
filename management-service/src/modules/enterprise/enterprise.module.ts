import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseRepository } from './adapter';
import { EnterpriseService } from './application/services';
import { QueryHandlers } from './application/queries/handlers';
import { CommandHandlers } from './application/commands/handlers';
import {
  GetEnterpriseCase,
  GetEnterpriseController,
} from './application/useCases/getEnterprise';
import {
  CreateEnterpriseCase,
  CreateEnterpriseController,
} from './application/useCases/createEnterprise';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EnterpriseRepository])],
  controllers: [GetEnterpriseController, CreateEnterpriseController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    EnterpriseService,
    GetEnterpriseCase,
    CreateEnterpriseCase,
  ],
})
export class EnterpriseModule {}
