import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetEnterpriseQuery } from '../queries/impl';
import { CreateEnterpriseCommand } from '../commands/impl';
import { CreateEnterpriseDto } from '../useCases/createEnterprise';

export class EnterpriseService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async getEnterprise(enterpriseId: string) {
    return this.queryBus.execute(new GetEnterpriseQuery(enterpriseId));
  }

  async createEnterprise(createEnterpriseDto: CreateEnterpriseDto) {
    return await this.commandBus.execute(
      new CreateEnterpriseCommand(createEnterpriseDto),
    );
  }
}
