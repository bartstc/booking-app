import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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
} from './application/useCases/createFacility';
import {
  RemoveFacilityHandler,
  RemoveFacilityController,
} from './application/useCases/removeFacility';
import {
  AddOfferHandler,
  AddOfferController,
} from './application/useCases/addOffer';
import {
  RemoveOfferHandler,
  RemoveOfferController,
} from './application/useCases/removeOffer';
import {
  AddEmployeeHandler,
  AddEmployeeController,
} from './application/useCases/addEmployee';
import {
  RemoveEmployeeHandler,
  RemoveEmployeeController,
} from './application/useCases/removeEmployee';
import { GetFacilityByIdController } from './application/query/getFacilityById';
import { GetFacilityBySlugController } from './application/query/getFacilityBySlug';
import { GetOfferController } from './application/query/getOffer';
import { GetOffersController } from './application/query/getOffers';
import { GetEmployeesController } from './application/query/getEmployees';
import { GetEmployeeController } from './application/query/getEmployee';

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
  ],
  providers: [
    CreateFacilityHandler,
    RemoveFacilityHandler,
    AddOfferHandler,
    RemoveOfferHandler,
    AddEmployeeHandler,
    RemoveEmployeeHandler,
  ],
})
export class FacilityModule {}
