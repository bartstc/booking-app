import { IContact, IContactPerson } from 'shared/domain/types';

import { IAddress, IBusinessCategory, IWorkingDay } from '../domain/types';

export interface BuildFacilityDto {
  facilityName: string;
  slug: string;
  address: IAddress;
  businessCategories: IBusinessCategory[];
  contacts: IContact[];
  availability: IWorkingDay[];
  facilityDescription?: string;
  contactPerson?: IContactPerson;
}
