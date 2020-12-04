import { EntityRepository, Repository } from 'typeorm/index';

import { Customer, CustomerRepository } from '../../domain';
import { CustomerEntity } from './Customer.entity';
import { CustomerMap } from './Customer.map';

@EntityRepository(CustomerEntity)
export class CustomerTypeormRepository extends Repository<CustomerEntity>
  implements CustomerRepository {
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

  async persist(customer: Customer): Promise<CustomerEntity> {
    return this.create(CustomerMap.toPersistence(customer));
  }

  private async getRawCustomerById(
    customerId: string,
  ): Promise<CustomerEntity> {
    const customer = await this.findOne({ customer_id: customerId });
    if (!customer) throw new Error('Customer not found');
    return customer;
  }
}
