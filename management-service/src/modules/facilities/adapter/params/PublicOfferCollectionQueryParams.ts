import { QueryParams } from 'shared/core';

import { Currency, PriceModel } from '../../domain/types';

export enum PublicOfferCollectionOrder {
  PriceType = 'priceType',
}

export interface PublicOfferCollectionQueryParams extends QueryParams {
  name?: string;
  priceType?: PriceModel;
  currency?: Currency;
}
