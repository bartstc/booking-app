import { Contact, Address } from 'types';

export interface Customer {
  customerId: string;
  facilityId: string;
  fullName: string;
  birthDate: string;
  description: string | null;
  contacts: Contact[];
  address: Address;
}
