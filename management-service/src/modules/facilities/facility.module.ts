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

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([
      FacilityRepository,
      OfferRepository,
      EmployeeRepository,
    ]),
  ],
  controllers: [GetFacilityController],
  providers: [GetFacilityCase],
})
export class FacilityModule {}
