import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RemoveOfferCommand } from '../impl';
import { RemoveOfferCase } from '../../useCases/removeOffer';

@CommandHandler(RemoveOfferCommand)
export class RemoveOfferHandler implements ICommandHandler<RemoveOfferCommand> {
  constructor(private removeOfferCase: RemoveOfferCase) {}

  async execute({ dto }: RemoveOfferCommand) {
    return await this.removeOfferCase.execute(dto);
  }
}
