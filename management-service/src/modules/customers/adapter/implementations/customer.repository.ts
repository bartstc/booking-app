import { EntityRepository, Repository } from 'typeorm/index';

import { CustomerEntity } from '../../infra/entities';
import { CustomerRepo } from '../customerRepo';
import { Customer } from '../../domain';
import { CustomerMap } from './customer.map';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity>
  implements CustomerRepo {
  async exists(customerId: string): Promise<boolean> {
    try {
      await this.getRawCustomerById(customerId);
    } catch {
      return false;
    }

    return true;
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    const entity = await this.getRawCustomerById(customerId);
    return CustomerMap.entityToDomain(entity);
  }

  async getRawCustomerById(customerId: string): Promise<CustomerEntity> {
    const customer = await this.findOne({ customer_id: customerId });
    if (!customer) throw new Error('Customer not found');
    return customer;
  }

  async persistModel(customer: Customer): Promise<CustomerEntity> {
    return this.create(CustomerMap.modelToPersistence(customer));
  }
}
