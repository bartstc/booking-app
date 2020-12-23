export class ActivateOfferCommand {
  constructor(
    public readonly facilityId: string,
    public readonly offerId: string,
  ) {}
}
