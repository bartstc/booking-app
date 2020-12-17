import { Customer } from '../Customer';

export interface CustomerRepository {
  persist(customer: Customer): Promise<any>;
  getCustomerById(customerId: string): Promise<Customer>;
  exists(customerId: string): Promise<boolean>;
  removeCustomer(customerId: string): Promise<void>;
}
