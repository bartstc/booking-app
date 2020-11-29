import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EnterpriseRepository } from '../../../infra';
import { AddFacilityCommand } from './AddFacility.command';

@CommandHandler(AddFacilityCommand)
export class AddFacilityHandler implements ICommandHandler<AddFacilityCommand> {
  constructor(private readonly repository: EnterpriseRepository) {}

  async execute({ enterpriseId, facilityId }: AddFacilityCommand) {
    await this.repository.addFacility(enterpriseId, facilityId);
  }
}
