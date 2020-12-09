import { CustomerDto } from '../../application/dto';

export interface CustomerQuery {
  getCustomerById(customerId: string): Promise<CustomerDto>;
  getFacilityCustomers(facilityId: string): Promise<CustomerDto[]>;
}
