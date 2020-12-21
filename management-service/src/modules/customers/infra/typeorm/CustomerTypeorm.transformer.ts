import { CustomerEntity } from './Customer.entity';
import { CustomerDto } from '../../application/dto';

export class CustomerTypeormTransformer {
  public static toDtoBulk(customers: CustomerEntity[]): CustomerDto[] {
    return customers.map(customer => this.toDto(customer));
  }

  public static toDto(customer: CustomerEntity): CustomerDto {
    return {
      customerId: customer.customer_id,
      facilityId: customer.facility_id,
      ...customer.details,
    };
  }
}
