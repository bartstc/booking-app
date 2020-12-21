import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

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
import { FacilityModule } from '../facilities/facility.module';
import { providers } from './customer.providers';
import { DbModule } from '../../db.module';

@Module({
  imports: [CqrsModule, DbModule, FacilityModule],
  controllers: [
    AddCustomerController,
    RemoveCustomerController,
    GetCustomerController,
    GetCustomersController,
  ],
  providers: [AddCustomerHandler, RemoveCustomerHandler, ...providers],
})
export class CustomerModule {}
