import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateFacilityCommand, DeleteFacilityCommand } from '../commands/impl';
import { CreateFacilityDto } from '../useCases/createFacility';
import { DeleteFacilityDto } from '../useCases/deleteFacility';

@Injectable()
export class FacilityService {
  constructor(private readonly commandBus: CommandBus) {}

  async createFacility(dto: CreateFacilityDto, enterpriseId: string) {
    return this.commandBus.execute(
      new CreateFacilityCommand(dto, enterpriseId),
    );
  }

  async deleteFacility(dto: DeleteFacilityDto) {
    return this.commandBus.execute(new DeleteFacilityCommand(dto));
  }
}
