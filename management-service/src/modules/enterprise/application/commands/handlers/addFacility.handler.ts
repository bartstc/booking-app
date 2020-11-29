import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddFacilityCommand } from '../impl';
import { EnterpriseRepository } from '../../../adapter';

@CommandHandler(AddFacilityCommand)
export class AddFacilityHandler implements ICommandHandler<AddFacilityCommand> {
  constructor(private readonly repository: EnterpriseRepository) {}

  async execute({ enterpriseId, facilityId }: AddFacilityCommand) {
    await this.repository.addFacility(enterpriseId, facilityId);
  }
}
