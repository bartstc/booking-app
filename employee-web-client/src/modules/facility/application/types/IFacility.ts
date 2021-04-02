import { Currency, IContact, IContactPerson } from 'types';

import { IAddress } from './IAddress';
import { IBusinessCategory } from './IBusinessCategory';
import { IWorkingDay } from './IWorkingDay';

export interface IFacility {
  facilityId: string;
  enterpriseId: string;
  name: string;
  slug: string;
  description: string | null;
  currency: Currency;
  address: IAddress;
  businessCategories: IBusinessCategory[];
  contacts: IContact[];
  workingDays: IWorkingDay[];
  contactPerson?: IContactPerson;
}
