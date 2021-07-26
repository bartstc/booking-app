import { AddCustomerDto } from './AddCustomer.dto';

export class AddCustomerCommand {
  constructor(
    public readonly dto: AddCustomerDto,
    public readonly facilityId: string,
    public readonly isSystemic: boolean,
  ) {}
}
