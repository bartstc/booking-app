import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './application/commands/handlers';
import { FacilityService } from './application/services';
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
  ],
  providers: [
    ...CommandHandlers,
    FacilityService,
    GetFacilityCase,
    GetOffersCase,
    GetEmployeesCase,
    CreateFacilityCase,
  ],
})
export class FacilityModule {}
