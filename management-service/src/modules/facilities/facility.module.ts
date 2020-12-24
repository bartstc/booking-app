import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EnterpriseModule } from '../enterprise/enterprise.module';
import {
  CreateFacilityController,
  CreateFacilityHandler,
} from './application/command/createFacility';
import {
  RemoveFacilityController,
  RemoveFacilityHandler,
} from './application/command/removeFacility';
import {
  AddOfferController,
  AddOfferHandler,
} from './application/command/addOffer';
import {
  RemoveOfferController,
  RemoveOfferHandler,
} from './application/command/removeOffer';
import {
  AddEmployeeController,
  AddEmployeeHandler,
} from './application/command/addEmployee';
import {
  RemoveEmployeeController,
  RemoveEmployeeHandler,
} from './application/command/removeEmployee';
import {
  ActivateOfferController,
  ActivateOfferHandler,
} from './application/command/activateOffer';
import {
  DeactivateOfferController,
  DeactivateOfferHandler,
} from './application/command/deactivateOffer';
import {
  ActivateEmployeeController,
  ActivateEmployeeHandler,
} from './application/command/activateEmployee';
import {
  DeactivateEmployeeController,
  DeactivateEmployeeHandler,
} from './application/command/deactivateEmployee';
import { GetFacilityByIdController } from './application/query/getFacilityById';
import { GetFacilityBySlugController } from './application/query/getFacilityBySlug';
import { GetOfferController } from './application/query/getOffer';
import { GetOffersController } from './application/query/getOffers';
import { GetEmployeesController } from './application/query/getEmployees';
import { GetEmployeeController } from './application/query/getEmployee';
import { GetBookingDataController } from './application/query/getBookingData';
import { DbModule } from '../../db.module';
import { providers } from './facility.providers';

@Module({
  imports: [CqrsModule, EnterpriseModule, DbModule],
  controllers: [
    CreateFacilityController,
    RemoveFacilityController,
    AddOfferController,
    RemoveOfferController,
    AddEmployeeController,
    RemoveEmployeeController,
    ActivateOfferController,
    DeactivateOfferController,
    ActivateEmployeeController,
    DeactivateEmployeeController,
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
    ActivateOfferHandler,
    DeactivateOfferHandler,
    ActivateEmployeeHandler,
    DeactivateEmployeeHandler,
    ...providers,
  ],
  exports: [providers[0]],
})
export class FacilityModule {}
