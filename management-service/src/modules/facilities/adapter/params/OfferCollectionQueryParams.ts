import { QueryParams } from 'shared/core';

import { OfferStatus, PriceModel } from '../../domain/types';

export interface OfferCollectionQueryParams extends QueryParams {
  name?: string;
  priceType?: PriceModel;
  status?: OfferStatus;
}
