import { QueryParams } from 'shared/core';

import { PriceModel } from '../../domain/types';

export interface OfferCollectionQueryParams extends QueryParams {
  name?: string;
  priceType?: PriceModel;
}
