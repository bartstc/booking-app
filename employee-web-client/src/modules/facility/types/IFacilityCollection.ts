import { IMeta } from 'types';

import { IFacility } from './IFacility';

export interface IFacilityCollection {
  collection: IFacility[];
  meta: IMeta;
}
