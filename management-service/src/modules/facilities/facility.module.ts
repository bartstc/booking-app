import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  providers: [GetFacilityCase, GetOffersCase, GetEmployeesCase],
})
export class FacilityModule {}
