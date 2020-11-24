import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddCustomerCommand } from '../impl';
import { AddCustomerCase } from '../../useCases/addCustomer';

@CommandHandler(AddCustomerCommand)
export class AddCustomerHandler implements ICommandHandler<AddCustomerCommand> {
  constructor(private addCustomerCase: AddCustomerCase) {}

  async execute({ facilityId, dto }: AddCustomerCommand) {
    return this.addCustomerCase.execute(dto, facilityId);
  }
}
