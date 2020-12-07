import { IContact } from 'shared/domain/types';

import { IAddress } from '../domain/types';

export interface BuildCustomerDto {
  fullName: string;
  birthDate: string;
  address: IAddress;
  contacts: IContact[];
  description?: string;
}
