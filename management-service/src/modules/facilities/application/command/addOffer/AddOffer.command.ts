import { AddOfferDto } from './AddOffer.dto';

export class AddOfferCommand {
  constructor(
    public readonly dto: AddOfferDto,
    public readonly facilityId: string,
  ) {}
}
