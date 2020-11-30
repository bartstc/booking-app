export class RemoveOfferCommand {
  constructor(
    public readonly facilityId: string,
    public readonly offerId: string,
  ) {}
}
