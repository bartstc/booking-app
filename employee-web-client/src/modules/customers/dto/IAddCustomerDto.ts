import { IContact } from 'types';

import { IAddress } from '../types';

export interface IAddCustomerDto {
  fullName: string;
  birthDate: string;
  address: IAddress;
  contacts: IContact[];
  description?: string;
}
