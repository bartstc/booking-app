import { IQueryParams } from 'types';

import { PriceModel } from './PriceModel';
import { OfferStatus } from './OfferStatus';

export interface IOfferCollectionQueryParams extends IQueryParams {
  name?: string;
  priceType?: PriceModel;
  status?: OfferStatus;
}
