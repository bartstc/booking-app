import { QueryListResult } from 'shared/core';

import { CustomerDto } from '../application/dto';
import { CustomerCollectionQueryParams } from './params';

export interface CustomerQuery {
  getCustomerById(customerId: string): Promise<CustomerDto>;
  getCustomers(
    facilityId: string,
    params: CustomerCollectionQueryParams,
  ): Promise<QueryListResult<CustomerDto>>;
}
