import { Currency, IContact, IContactPerson } from 'types';

import { IAddress } from './IAddress';
import { IBusinessCategory } from './IBusinessCategory';
import { IWorkingDay } from './IWorkingDay';

export interface CreateFacilityDto {
  facilityName: string;
  slug: string;
  address: IAddress;
  currency: Currency;
  businessCategories: IBusinessCategory[];
  contacts: IContact[];
  availability: IWorkingDay[];
  facilityDescription?: string;
  contactPerson?: IContactPerson;
}
