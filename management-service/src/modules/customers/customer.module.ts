import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { FacilityModule } from '../facilities/facility.module';
import { providers } from './customer.providers';
import { DatabaseModule } from '../../database';

import { AddCustomerHandler } from './application/command/addCustomer';
import { RemoveCustomerHandler } from './application/command/removeCustomer';
import { GetCustomerHandler } from './application/query/getCustomer';
import { GetCustomersHandler } from './application/query/getCustomers';

import {
  AddCustomerController,
  RemoveCustomerController,
} from './api/controllers/command';
import {
  GetCustomerController,
  GetCustomersController,
} from './api/controllers/query';

@Module({
  imports: [CqrsModule, DatabaseModule, FacilityModule],
  controllers: [
    AddCustomerController,
    RemoveCustomerController,
    GetCustomerController,
    GetCustomersController,
  ],
  providers: [
    AddCustomerHandler,
    RemoveCustomerHandler,
    GetCustomerHandler,
    GetCustomersHandler,
    ...providers,
  ],
})
export class CustomerModule {}
