import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateFacilityCommand } from '../impl';
import { CreateFacilityCase } from '../../useCases/createFacility';

@CommandHandler(CreateFacilityCommand)
export class CreateFacilityHandler
  implements ICommandHandler<CreateFacilityCommand> {
  constructor(private createFacilityCase: CreateFacilityCase) {}

  async execute({ enterpriseId, dto }: CreateFacilityCommand) {
    return this.createFacilityCase.execute(dto, enterpriseId);
  }
}
