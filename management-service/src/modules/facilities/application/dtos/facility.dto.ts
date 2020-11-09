import { IContact, IContactPerson } from 'shared/domain/types';

import { IAddress, IBusinessCategory, IWorkingDay } from '../../domain/types';

export class FacilityDto {
  facilityId: string;
  enterpriseId: string;
  name: string;
  description: string | null;
  contactPerson: IContactPerson | null;
  address: IAddress;
  businessCategories: IBusinessCategory[];
  contacts: IContact[];
  workingDays: IWorkingDay[];
}
