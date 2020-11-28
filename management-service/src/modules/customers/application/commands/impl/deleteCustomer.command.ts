import { DeleteCustomerDto } from '../../useCases/deleteCustomer';

export class DeleteCustomerCommand {
  constructor(public readonly dto: DeleteCustomerDto) {}
}
