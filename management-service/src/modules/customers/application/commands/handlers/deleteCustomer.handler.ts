import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteCustomerCommand } from '../impl';
import { DeleteCustomerCase } from '../../useCases/deleteCustomer';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand> {
  constructor(private deleteCustomerCase: DeleteCustomerCase) {}

  async execute({ dto }: DeleteCustomerCommand) {
    return await this.deleteCustomerCase.execute(dto);
  }
}
