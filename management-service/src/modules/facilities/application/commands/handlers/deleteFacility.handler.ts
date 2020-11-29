import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeleteFacilityCommand } from '../impl';
import { DeleteFacilityCase } from '../../useCases/deleteFacility';

@CommandHandler(DeleteFacilityCommand)
export class DeleteFacilityHandler
  implements ICommandHandler<DeleteFacilityCommand> {
  constructor(private deleteFacilityCase: DeleteFacilityCase) {}

  async execute({ dto }: DeleteFacilityCommand) {
    return await this.deleteFacilityCase.execute(dto);
  }
}
