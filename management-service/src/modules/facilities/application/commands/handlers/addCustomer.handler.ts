import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddCustomerCommand } from '../impl';
import { FacilityRepository } from '../../../adapter';

@CommandHandler(AddCustomerCommand)
export class AddCustomerHandler implements ICommandHandler<AddCustomerCommand> {
  constructor(private readonly repository: FacilityRepository) {}

  async execute({ customerId, facilityId }: AddCustomerCommand) {
    await this.repository.addCustomer(facilityId, customerId);
  }
}
