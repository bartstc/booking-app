import { CustomerQuery } from '../query';
import { Repository } from 'typeorm/index';
import { CustomerEntity } from './Customer.entity';
import { CustomerDto } from '../../application/dto';
import { CustomerTypeormTransformer } from './CustomerTypeorm.transformer';

export class CustomerTypeormQuery extends Repository<CustomerEntity>
  implements CustomerQuery {
  async getCustomerById(customerId: string): Promise<CustomerDto> {
    const customer = await this.findOne({ customer_id: customerId });
    if (!customer) throw new Error('Customer not found');
    return CustomerTypeormTransformer.toDto(customer);
  }

  async getFacilityCustomers(facilityId: string): Promise<CustomerDto[]> {
    const customers = await this.find({ facility_id: facilityId });
    return customers.length
      ? CustomerTypeormTransformer.toDtoBulk(customers)
      : [];
  }
}
