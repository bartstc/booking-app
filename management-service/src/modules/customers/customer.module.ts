import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilityRepository } from '../facilities/infra';
import { CustomerQuery, CustomerRepository } from './infra';
import {
  AddCustomerController,
  AddCustomerHandler,
} from './application/command/addCustomer';
import {
  RemoveCustomerController,
  RemoveCustomerHandler,
} from './application/command/removeCustomer';
import { GetCustomerController } from './application/query/getCustomer';
import { GetCustomersController } from './application/query/getCustomers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      FacilityRepository,
      CustomerRepository,
      CustomerQuery,
    ]),
  ],
  controllers: [
    AddCustomerController,
    RemoveCustomerController,
    GetCustomerController,
    GetCustomersController,
  ],
  providers: [AddCustomerHandler, RemoveCustomerHandler],
})
export class CustomerModule {}
