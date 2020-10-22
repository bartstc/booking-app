import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseRepository } from './adapter';
import { QueryHandlers } from './application/queries/handlers';
import { EnterpriseService } from './application/services';
import {
  GetEnterpriseCase,
  GetEnterpriseController,
} from './application/useCases/getEnterprise';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EnterpriseRepository])],
  controllers: [GetEnterpriseController],
  providers: [...QueryHandlers, EnterpriseService, GetEnterpriseCase],
})
export class EnterpriseModule {}
