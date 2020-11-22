import { IContact } from 'shared/domain/types';

import { IAddress } from '../../domain/types';

export interface CustomerDto {
  customerId: string;
  facilityId: string;
  fullName: string;
  description: string | null;
  contacts: IContact[];
  address: IAddress;
}
