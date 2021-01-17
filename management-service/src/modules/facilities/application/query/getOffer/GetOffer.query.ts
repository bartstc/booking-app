export class GetOfferQuery {
  constructor(
    public readonly offerId: string,
    public readonly facilityId: string,
  ) {}
}
