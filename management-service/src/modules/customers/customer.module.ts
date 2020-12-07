import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilityRepository } from '../facilities/infra';
import { CustomerRepository } from './infra';
import {
  AddCustomerController,
  AddCustomerHandler,
} from './application/command/addCustomer';
import {
  RemoveCustomerController,
  RemoveCustomerHandler,
} from './application/command/removeCustomer';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FacilityRepository, CustomerRepository]),
  ],
  controllers: [AddCustomerController, RemoveCustomerController],
  providers: [AddCustomerHandler, RemoveCustomerHandler],
})
export class CustomerModule {}
