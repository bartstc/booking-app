import { QueryListResult, QueryParams } from 'shared/core';
import { CustomerDto } from '../application/dto';

export interface CustomerQuery {
  getCustomerById(customerId: string): Promise<CustomerDto>;
  getCustomers<Params extends QueryParams>(
    facilityId: string,
    params: Params,
  ): Promise<QueryListResult<CustomerDto>>;
}
