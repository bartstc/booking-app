import { IMeta } from 'types';

import { ICustomer } from './ICustomer';

export interface ICustomerCollection {
  collection: ICustomer[];
  meta: IMeta;
}
