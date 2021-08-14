import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from 'database';
import { AmqpModule } from 'amqp';

import { providers } from './facility.providers';
import { EnterpriseModule } from '../enterprise/enterprise.module';

import { CreateFacilityHandler } from './application/command/createFacility';
import { UpdateFacilityHandler } from './application/command/updateFacility';
import { RemoveFacilityHandler } from './application/command/removeFacility';
import { AddOfferHandler } from './application/command/addOffer';
import { RemoveOfferHandler } from './application/command/removeOffer';
import { ActivateOfferHandler } from './application/command/activateOffer';
import { DeactivateOfferHandler } from './application/command/deactivateOffer';

import { GetFacilityByIdHandler } from './application/query/getFacilityById';
import { GetFacilityBySlugHandler } from './application/query/getFacilityBySlug';
import { GetFacilitiesHandler } from './application/query/getFacilities';
import { GetOfferHandler } from './application/query/getOffer';
import { GetOffersHandler } from './application/query/getOffers';
import { GetPublicOffersHandler } from './application/query/getPublicOffers';

import {
  ActivateOfferController,
  AddOfferController,
  CreateFacilityController,
  DeactivateOfferController,
  RemoveFacilityController,
  RemoveOfferController,
  UpdateFacilityController,
} from './api/controllers/command';

import {
  GetFacilitiesController,
  GetFacilityByIdController,
  GetFacilityBySlugController,
  GetOfferController,
  GetOffersController,
  GetPublicOffersController,
} from './api/controllers/query';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    CqrsModule,
    EnterpriseModule,
    DatabaseModule,
    AmqpModule,
    EmployeesModule,
  ],
  controllers: [
    CreateFacilityController,
    UpdateFacilityController,
    RemoveFacilityController,
    AddOfferController,
    RemoveOfferController,
    ActivateOfferController,
    DeactivateOfferController,
    GetFacilityByIdController,
    GetFacilityBySlugController,
    GetFacilitiesController,
    GetOfferController,
    GetOffersController,
    GetPublicOffersController,
  ],
  providers: [
    CreateFacilityHandler,
    UpdateFacilityHandler,
    RemoveFacilityHandler,
    AddOfferHandler,
    RemoveOfferHandler,
    ActivateOfferHandler,
    DeactivateOfferHandler,
    GetFacilityByIdHandler,
    GetFacilityBySlugHandler,
    GetFacilitiesHandler,
    GetOfferHandler,
    GetOffersHandler,
    GetPublicOffersHandler,
    ...providers,
  ],
  exports: [providers[0]],
})
export class FacilityModule {}
