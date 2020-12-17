import { EntityRepository, Repository } from 'typeorm/index';

import { Customer, CustomerRepository } from '../../domain';
import { CustomerEntity } from './Customer.entity';
import { CustomerMap } from '../../adapter';

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

  async removeCustomer(customerId: string): Promise<void> {
    const result = await this.delete({ customer_id: customerId });

    if (result.affected === 0) {
      throw new Error(`Customer with id ${customerId} not found`);
    }
  }

  private async getRawCustomerById(
    customerId: string,
  ): Promise<CustomerEntity> {
    const customer = await this.findOne({ customer_id: customerId });
    if (!customer) throw new Error('Customer not found');
    return customer;
  }
}
