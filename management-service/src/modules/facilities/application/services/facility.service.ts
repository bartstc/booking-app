import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateFacilityDto } from '../useCases/createFacility';
import { CreateFacilityCommand } from '../commands/impl';

@Injectable()
export class FacilityService {
  constructor(private readonly commandBus: CommandBus) {}

  async createFacility(dto: CreateFacilityDto, enterpriseId: string) {
    return this.commandBus.execute(
      new CreateFacilityCommand(dto, enterpriseId),
    );
  }
}
