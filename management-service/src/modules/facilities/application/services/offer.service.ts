import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AddOfferCommand } from '../commands/impl';
import { AddOfferDto } from '../useCases/addOffer';

@Injectable()
export class OfferService {
  constructor(private readonly commandBus: CommandBus) {}

  async addOffer(dto: AddOfferDto, facilityId: string) {
    return this.commandBus.execute(new AddOfferCommand(dto, facilityId));
  }
}
