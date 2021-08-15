import { QueryListResult } from 'shared/core';

import { OfferDto } from '../application/dto';
import {
  OfferCollectionQueryParams,
  PublicOfferCollectionQueryParams,
} from './params';

export interface OfferQuery {
  getOfferById(offerId: string): Promise<OfferDto>;
  getOffers(
    facilityId: string,
    params: OfferCollectionQueryParams,
  ): Promise<QueryListResult<OfferDto>>;
  getPublicOffers(
    params: PublicOfferCollectionQueryParams,
  ): Promise<QueryListResult<OfferDto>>;
}
