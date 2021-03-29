import { Currency, IContact, IContactPerson } from 'types';

import { IAddress, IBusinessCategory, IWorkingDay } from '../types';

export interface ICreateFacilityDto {
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
