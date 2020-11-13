import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddEmployeeCommand } from '../impl';
import { AddEmployeeCase } from '../../useCases/addEmployee';

@CommandHandler(AddEmployeeCommand)
export class AddEmployeeHandler implements ICommandHandler<AddEmployeeCommand> {
  constructor(private addEmployeeCase: AddEmployeeCase) {}

  async execute({ facilityId, dto }: AddEmployeeCommand) {
    return this.addEmployeeCase.execute(dto, facilityId);
  }
}
