import { OfferCollectionQueryParams } from '../../../adapter/params';

export class GetOffersQuery {
  constructor(
    public readonly facilityId: string,
    public readonly params: OfferCollectionQueryParams,
  ) {}
}
