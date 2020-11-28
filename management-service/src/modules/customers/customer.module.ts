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
import {
  DeleteCustomerCase,
  DeleteCustomerController,
} from './application/useCases/deleteCustomer';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FacilityRepository, CustomerRepository]),
  ],
  controllers: [AddCustomerController, DeleteCustomerController],
  providers: [
    ...CommandHandlers,
    CustomerService,
    AddCustomerCase,
    DeleteCustomerCase,
  ],
})
export class CustomerModule {}
