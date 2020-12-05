import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FacilityRepository } from '../facilities/infra';
import { CustomerRepository } from './infra';
import {
  AddCustomerController,
  AddCustomerHandler,
} from './application/command/addCustomer';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([FacilityRepository, CustomerRepository]),
  ],
  controllers: [AddCustomerController],
  providers: [AddCustomerHandler],
})
export class CustomerModule {}
