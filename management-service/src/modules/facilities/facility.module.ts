import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnterpriseModule } from '../enterprise/enterprise.module';
import {
  EmployeeQuery,
  EmployeeRepository,
  FacilityQuery,
  FacilityRepository,
  OfferQuery,
  OfferRepository,
} from './infra';
import {
  CreateFacilityHandler,
  CreateFacilityController,
} from './application/command/createFacility';
import {
  RemoveFacilityHandler,
  RemoveFacilityController,
} from './application/command/removeFacility';
import {
  AddOfferHandler,
  AddOfferController,
} from './application/command/addOffer';
import {
  RemoveOfferHandler,
  RemoveOfferController,
} from './application/command/removeOffer';
import {
  AddEmployeeHandler,
  AddEmployeeController,
} from './application/command/addEmployee';
import {
  RemoveEmployeeHandler,
  RemoveEmployeeController,
} from './application/command/removeEmployee';
import { GetFacilityByIdController } from './application/query/getFacilityById';
import { GetFacilityBySlugController } from './application/query/getFacilityBySlug';
import { GetOfferController } from './application/query/getOffer';
import { GetOffersController } from './application/query/getOffers';
import { GetEmployeesController } from './application/query/getEmployees';
import { GetEmployeeController } from './application/query/getEmployee';
import { GetBookingDataController } from './application/query/getBookingData';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      FacilityRepository,
      FacilityQuery,
      OfferRepository,
      OfferQuery,
      EmployeeRepository,
      EmployeeQuery,
    ]),
    EnterpriseModule,
  ],
  controllers: [
    CreateFacilityController,
    RemoveFacilityController,
    AddOfferController,
    RemoveOfferController,
    AddEmployeeController,
    RemoveEmployeeController,
    GetFacilityByIdController,
    GetFacilityBySlugController,
    GetOfferController,
    GetOffersController,
    GetEmployeesController,
    GetEmployeeController,
    GetBookingDataController,
  ],
  providers: [
    CreateFacilityHandler,
    RemoveFacilityHandler,
    AddOfferHandler,
    RemoveOfferHandler,
    AddEmployeeHandler,
    RemoveEmployeeHandler,
  ],
  exports: [TypeOrmModule.forFeature([FacilityRepository])],
})
export class FacilityModule {}
