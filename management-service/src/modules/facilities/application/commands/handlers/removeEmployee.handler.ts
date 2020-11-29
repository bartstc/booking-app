import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveEmployeeCommand } from '../impl';
import { RemoveEmployeeCase } from '../../useCases/removeEmployee';

@CommandHandler(RemoveEmployeeCommand)
export class RemoveEmployeeHandler
  implements ICommandHandler<RemoveEmployeeCommand> {
  constructor(private removeEmployeeCase: RemoveEmployeeCase) {}

  async execute({ dto }: RemoveEmployeeCommand) {
    return await this.removeEmployeeCase.execute(dto);
  }
}
