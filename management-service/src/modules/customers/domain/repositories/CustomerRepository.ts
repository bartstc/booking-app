import { Customer } from '../Customer';

export interface CustomerRepository {
  persist(customer: Customer): Promise<unknown>;
  getCustomerById(customerId: string): Promise<Customer>;
  exists(customerId: string): Promise<boolean>;
}
