import { ICollection, IMeta } from 'types';

import { IFacility } from './IFacility';

export interface IFacilityCollection extends ICollection<IFacility> {
  collection: IFacility[];
  meta: IMeta;
}
