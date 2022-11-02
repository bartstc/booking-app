import { DEFAULT_PARAMS } from 'utils/constant';

import { IOfferCollectionQueryParams } from './types';

export const OFFER_COLLECTION_DEFAULT_PARAMS: IOfferCollectionQueryParams = {
  order: 'status',
  ...DEFAULT_PARAMS,
};
