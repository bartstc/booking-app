import { CustomerDto } from '../../application/dto';
import { QueryListResult, QueryParams } from '../../../../shared/core';

export interface CustomerQuery {
  getCustomerById(customerId: string): Promise<CustomerDto>;
  getCustomers<Params extends QueryParams>(
    facilityId: string,
    params: Params,
  ): Promise<QueryListResult<CustomerDto>>;
}
