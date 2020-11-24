import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilityRepository } from '../facilities/adapter';
import { CustomerRepository } from './adapter';
import { CommandHandlers } from './application/commands/handlers';
import { CustomerService } from './application/services';
import {
  AddCustomerCase,
  AddCustomerController,
} from './application/useCases/addCustomer';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FacilityRepository, CustomerRepository]),
  ],
  controllers: [AddCustomerController],
  providers: [...CommandHandlers, CustomerService, AddCustomerCase],
})
export class CustomerModule {}
