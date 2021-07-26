import { Contact } from 'types';

import { IAddress } from './IAddress';

export interface ICustomer {
  customerId: string;
  facilityId: string;
  fullName: string;
  birthDate: string;
  description: string | null;
  contacts: Contact[];
  address: IAddress;
  isSystemic: boolean;
}
