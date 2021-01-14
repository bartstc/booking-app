import { EntityRepository } from 'typeorm/index';

import { BaseQuery, QueryListResult } from 'shared/core';

import { CustomerEntity } from './Customer.entity';
import { CustomerDto } from '../../application/dto';
import { CustomerTypeormTransformer } from './CustomerTypeorm.transformer';
import { CustomerQuery } from '../../adapter';
import { CustomerCollectionQueryParams } from '../../adapter/params';

@EntityRepository(CustomerEntity)
export class CustomerTypeormQuery
  extends BaseQuery<CustomerEntity>
  implements CustomerQuery {
  async getCustomerById(customerId: string): Promise<CustomerDto> {
    const customer = await this.findOne({ customer_id: customerId });
    if (!customer) throw new Error('Customer not found');
    return CustomerTypeormTransformer.toDto(customer);
  }

  async getCustomers(
    facilityId: string,
    { fullName = '', limit = 10, offset = 0 }: CustomerCollectionQueryParams,
  ): Promise<QueryListResult<CustomerDto>> {
    const [collection, total] = await this.paginatedQueryBuilder('customer', {
      limit,
      offset,
    })
      .where('customer.facility_id = :facilityId', { facilityId })
      .andWhere(`customer.details::jsonb->>'fullName' ilike '%${fullName}%'`)
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
