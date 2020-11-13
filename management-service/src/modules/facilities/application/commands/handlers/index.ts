import { CreateFacilityHandler } from './createFacility.handler';
import { DeleteFacilityHandler } from './deleteFacility.handler';
import { AddOfferHandler } from './addOffer.handler';
import { RemoveOfferHandler } from './removeOffer.handler';
import { AddEmployeeHandler } from './addEmployee.handler';

export const CommandHandlers = [
  CreateFacilityHandler,
  DeleteFacilityHandler,
  AddOfferHandler,
  RemoveOfferHandler,
  AddEmployeeHandler,
];
