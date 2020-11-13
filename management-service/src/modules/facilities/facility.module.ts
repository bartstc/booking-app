import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './application/commands/handlers';
import { FacilityService, OfferService } from './application/services';
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
    GetOffersController,
    GetEmployeesController,
    CreateFacilityController,
    DeleteFacilityController,
    AddOfferController,
    RemoveOfferController,
  ],
  providers: [
    ...CommandHandlers,
    FacilityService,
    OfferService,
    GetFacilityCase,
    GetOffersCase,
    GetEmployeesCase,
    CreateFacilityCase,
    DeleteFacilityCase,
    AddOfferCase,
    RemoveOfferCase,
  ],
})
export class FacilityModule {}
