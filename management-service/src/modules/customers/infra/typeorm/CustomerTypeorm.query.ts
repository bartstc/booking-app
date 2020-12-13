import { EntityRepository } from 'typeorm/index';

import { BaseQuery, QueryListResult, QueryParams } from 'shared/core';

import { CustomerQuery } from '../query';
import { CustomerEntity } from './Customer.entity';
import { CustomerDto } from '../../application/dto';
import { CustomerTypeormTransformer } from './CustomerTypeorm.transformer';

@EntityRepository(CustomerEntity)
export class CustomerTypeormQuery extends BaseQuery<CustomerEntity>
  implements CustomerQuery {
  async getCustomerById(customerId: string): Promise<CustomerDto> {
    const customer = await this.findOne({ customer_id: customerId });
    if (!customer) throw new Error('Customer not found');
    return CustomerTypeormTransformer.toDto(customer);
  }

  async getCustomers(
    facilityId: string,
    { query = '', limit = 10, offset = 0 }: QueryParams,
  ): Promise<QueryListResult<CustomerDto>> {
    const [collection, total] = await this.paginatedQueryBuilder('customer', {
      limit,
      offset,
    })
      .where('customer.facility_id = :facilityId', { facilityId })
      .andWhere(`customer.details::jsonb->>'fullName' ilike '%${query}%'`)
      .getManyAndCount();

    return {
      collection: CustomerTypeormTransformer.toDtoBulk(collection),
      meta: {
        total,
        offset,
        limit,
      },
    };
  }
}
