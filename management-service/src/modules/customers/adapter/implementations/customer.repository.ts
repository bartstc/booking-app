import { EntityRepository, Repository } from 'typeorm/index';

import { CustomerEntity } from '../../infra/entities';
import { CustomerRepo } from '../customerRepo';
import { Customer } from '../../domain';
import { CustomerMap } from './customer.map';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity>
  implements CustomerRepo {
  async persistModel(customer: Customer): Promise<CustomerEntity> {
    return this.create(CustomerMap.modelToPersistence(customer));
  }
}
