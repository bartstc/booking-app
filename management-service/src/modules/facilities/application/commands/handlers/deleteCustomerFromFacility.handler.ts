import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteCustomerFromFacilityCommand } from '../impl';
import { FacilityRepository } from '../../../adapter';

@CommandHandler(DeleteCustomerFromFacilityCommand)
export class DeleteCustomerFromFacilityHandler
  implements ICommandHandler<DeleteCustomerFromFacilityCommand> {
  constructor(private readonly repository: FacilityRepository) {}

  async execute({ customerId, facilityId }: DeleteCustomerFromFacilityCommand) {
    await this.repository.deleteCustomer(facilityId, customerId);
  }
}
