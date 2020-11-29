import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { CreateEnterpriseCommand } from '../commands/impl';
import { CreateEnterpriseDto } from '../useCases/createEnterprise';

@Injectable()
export class EnterpriseService {
  constructor(private readonly commandBus: CommandBus) {}

  async createEnterprise(createEnterpriseDto: CreateEnterpriseDto) {
    return await this.commandBus.execute(
      new CreateEnterpriseCommand(createEnterpriseDto),
    );
  }
}
