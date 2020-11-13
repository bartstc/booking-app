import { AddOfferDto } from '../../useCases/addOffer';

export class AddOfferCommand {
  constructor(
    public readonly dto: AddOfferDto,
    public readonly facilityId: string,
  ) {}
}
