import { ICollection, IMeta } from 'types';

import { ICustomer } from './ICustomer';

export interface ICustomerCollection extends ICollection<ICustomer> {
  collection: ICustomer[];
  meta: IMeta;
}
