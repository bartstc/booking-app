import { Customer } from '../domain';
import { CustomerEntity } from '../infra/entities';

export interface CustomerRepo {
  persistModel(employee: Customer): Promise<CustomerEntity>;
  getRawCustomerById(customerId: string): Promise<CustomerEntity>;
  getCustomerById(customerId: string): Promise<Customer>;
  exists(customerId: string): Promise<boolean>;
}
