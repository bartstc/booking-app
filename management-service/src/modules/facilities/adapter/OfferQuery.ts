import { OfferDto } from '../application/dto';
import { OfferCollectionQueryParams } from './params';
import { QueryListResult } from '../../../shared/core';

export interface OfferQuery {
  getOfferById(offerId: string): Promise<OfferDto>;
  getOffers(
    facilityId: string,
    params: OfferCollectionQueryParams,
  ): Promise<QueryListResult<OfferDto>>;
}
