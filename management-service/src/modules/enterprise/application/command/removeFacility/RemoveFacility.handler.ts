import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EnterpriseRepository } from '../../../infra';
import { RemoveFacilityCommand } from './RemoveFacility.command';

@CommandHandler(RemoveFacilityCommand)
export class RemoveFacilityHandler
  implements ICommandHandler<RemoveFacilityCommand> {
  constructor(private readonly repository: EnterpriseRepository) {}

  async execute({ enterpriseId, facilityId }: RemoveFacilityCommand) {
    await this.repository.removeFacility(enterpriseId, facilityId);
  }
}
