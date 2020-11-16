import { CreateEnterpriseHandler } from './createEnterprise.handler';
import { AddFacilityHandler } from './addFacility.handler';
import { RemoveFacilityHandler } from './removeFacility.handler';

export const CommandHandlers = [
  CreateEnterpriseHandler,
  AddFacilityHandler,
  RemoveFacilityHandler,
];
