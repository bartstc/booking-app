export class DeactivateOfferCommand {
  constructor(
    public readonly facilityId: string,
    public readonly offerId: string,
  ) {}
}
