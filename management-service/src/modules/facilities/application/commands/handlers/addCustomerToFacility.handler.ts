import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddCustomerToFacilityCommand } from '../impl';
import { FacilityRepository } from '../../../adapter';

@CommandHandler(AddCustomerToFacilityCommand)
export class AddCustomerToFacilityHandler implements ICommandHandler<AddCustomerToFacilityCommand> {
  constructor(private readonly repository: FacilityRepository) {}

  async execute({ customerId, facilityId }: AddCustomerToFacilityCommand) {
    await this.repository.addCustomer(facilityId, customerId);
  }
}
