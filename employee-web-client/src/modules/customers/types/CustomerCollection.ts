import { Meta } from 'types';

import { Customer } from './Customer';

export interface CustomerCollection {
  collection: Customer[];
  meta: Meta;
}
