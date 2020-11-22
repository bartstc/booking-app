import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './application/commands/handlers';
import { FacilityFactory } from './application/factories';
import {
  EmployeeService,
  FacilityService,
  OfferService,
} from './application/services';
import {
  EmployeeRepository,
  FacilityRepository,
  OfferRepository,
} from './adapter';
import {
  GetFacilityCase,
  GetFacilityController,
} from './application/useCases/getFacility';
import {
  GetOffersCase,
  GetOffersController,
} from './application/useCases/getOffers';
import {
  GetEmployeesCase,
  GetEmployeesController,
} from './application/useCases/getEmployees';
import {
  CreateFacilityCase,
  CreateFacilityController,
} from './application/useCases/createFacility';
import {
  DeleteFacilityCase,
  DeleteFacilityController,
} from './application/useCases/deleteFacility';
import {
  AddOfferCase,
  AddOfferController,
} from './application/useCases/addOffer';
import {
  RemoveOfferCase,
  RemoveOfferController,
} from './application/useCases/removeOffer';
import {
  AddEmployeeCase,
  AddEmployeeController,
} from './application/useCases/addEmployee';
import {
  RemoveEmployeeCase,
  RemoveEmployeeController,
} from './application/useCases/removeEmployee';
import {
  GetEmployeeCase,
  GetEmployeeController,
} from './application/useCases/getEmployee';
import {
  GetOfferCase,
  GetOfferController,
} from './application/useCases/getOffer';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      FacilityRepository,
      OfferRepository,
      EmployeeRepository,
    ]),
  ],
  controllers: [
    GetFacilityController,
    GetOfferController,
    GetOffersController,
    GetEmployeesController,
    GetEmployeeController,
    CreateFacilityController,
    DeleteFacilityController,
    AddOfferController,
    RemoveOfferController,
    AddEmployeeController,
    RemoveEmployeeController,
  ],
  providers: [
    ...CommandHandlers,
    FacilityService,
    OfferService,
    EmployeeService,
    FacilityFactory,
    GetFacilityCase,
    GetOfferCase,
    GetOffersCase,
    GetEmployeesCase,
    GetEmployeeCase,
    CreateFacilityCase,
    DeleteFacilityCase,
    AddOfferCase,
    RemoveOfferCase,
    AddEmployeeCase,
    RemoveEmployeeCase,
  ],
})
export class FacilityModule {}
