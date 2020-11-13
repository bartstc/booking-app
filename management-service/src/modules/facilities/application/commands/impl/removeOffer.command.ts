import { RemoveOfferDto } from '../../useCases/removeOffer';

export class RemoveOfferCommand {
  constructor(public readonly dto: RemoveOfferDto) {}
}
