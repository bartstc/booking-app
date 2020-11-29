import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddOfferCommand } from '../impl';
import { AddOfferCase } from '../../useCases/addOffer';

@CommandHandler(AddOfferCommand)
export class AddOfferHandler implements ICommandHandler<AddOfferCommand> {
  constructor(private addOfferCase: AddOfferCase) {}

  async execute({ facilityId, dto }: AddOfferCommand) {
    return this.addOfferCase.execute(dto, facilityId);
  }
}
