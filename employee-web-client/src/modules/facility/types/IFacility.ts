import { IContact, IContactPerson } from 'types';

import { IAddress } from './IAddress';
import { IBusinessCategory } from './IBusinessCategory';
import { IWorkingDay } from './IWorkingDay';

export interface IFacility {
  facilityId: string;
  enterpriseId: string;
  name: string;
  slug: string;
  description: string | null;
  contactPerson: IContactPerson | null;
  address: IAddress;
  businessCategories: IBusinessCategory[];
  contacts: IContact[];
  workingDays: IWorkingDay[];
}
