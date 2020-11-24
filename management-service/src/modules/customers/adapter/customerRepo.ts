import { Customer } from '../domain';
import { CustomerEntity } from '../infra/entities';

export interface CustomerRepo {
  persistModel(employee: Customer): Promise<CustomerEntity>;
}
