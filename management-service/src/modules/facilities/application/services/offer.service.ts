import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AddOfferCommand, RemoveOfferCommand } from '../commands/impl';
import { AddOfferDto } from '../useCases/addOffer';
import { RemoveOfferDto } from '../useCases/removeOffer';

@Injectable()
export class OfferService {
  constructor(private readonly commandBus: CommandBus) {}

  async addOffer(dto: AddOfferDto, facilityId: string) {
    return this.commandBus.execute(new AddOfferCommand(dto, facilityId));
  }

  async removeOffer(dto: RemoveOfferDto) {
    return this.commandBus.execute(new RemoveOfferCommand(dto));
  }
}
