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
    {
      fullName = '',
      limit = 10,
      offset = 0,
      order: orderKey,
    }: CustomerCollectionQueryParams,
  ): Promise<QueryListResult<CustomerDto>> {
    let query = this.paginatedQueryBuilder('customer', {
      limit,
      offset,
    })
      .where('customer.facility_id = :facilityId', { facilityId })
      .andWhere(`customer.details::jsonb->>'fullName' ilike '%${fullName}%'`);

    if (orderKey) {
      const [sort, order] = this.extractOrder(orderKey);

      const allowedOrderKeys = ['fullName', 'birthDate'];
      if (allowedOrderKeys.includes(sort)) {
        query = query.orderBy(`customer.details::jsonb->>'${sort}'`, order);
      }
    }

    const [collection, total] = await query.getManyAndCount();

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
