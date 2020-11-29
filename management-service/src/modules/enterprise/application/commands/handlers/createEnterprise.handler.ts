import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateEnterpriseCommand } from '../impl';
import { CreateEnterpriseCase } from '../../useCases/createEnterprise';

@CommandHandler(CreateEnterpriseCommand)
export class CreateEnterpriseHandler
  implements ICommandHandler<CreateEnterpriseCommand> {
  constructor(private createEnterpriseCase: CreateEnterpriseCase) {}

  async execute({ createEnterpriseDto }: CreateEnterpriseCommand) {
    return await this.createEnterpriseCase.execute(createEnterpriseDto);
  }
}
