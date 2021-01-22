import { IContact } from 'types';

import { IAddress } from '../types';

export interface IAddCustomerDto {
  fullName: string;
  birthDate: string;
  description: string;
  address: IAddress;
  contacts: IContact[];
}
