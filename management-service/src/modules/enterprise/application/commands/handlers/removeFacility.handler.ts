import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveFacilityCommand } from '../impl';
import { EnterpriseRepository } from '../../../adapter';

@CommandHandler(RemoveFacilityCommand)
export class RemoveFacilityHandler
  implements ICommandHandler<RemoveFacilityCommand> {
  constructor(private readonly repository: EnterpriseRepository) {}

  async execute({ enterpriseId, facilityId }: RemoveFacilityCommand) {
    await this.repository.removeFacility(enterpriseId, facilityId);
  }
}
