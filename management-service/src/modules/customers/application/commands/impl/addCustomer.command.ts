import { AddCustomerDto } from '../../useCases/addCustomer';

export class AddCustomerCommand {
  constructor(
    public readonly dto: AddCustomerDto,
    public readonly facilityId: string,
  ) {}
}
