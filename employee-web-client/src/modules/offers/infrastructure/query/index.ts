import { buildUrl } from 'utils';
import { httpService } from 'utils/http-service';

import { IOfferCollection, IOfferCollectionQueryParams } from '../../types';

export const getOffersKey = (facilityId: string, params: IOfferCollectionQueryParams) => [`facilities/${facilityId}/offers`, params];

export const getOffers = (facilityId: string, params: IOfferCollectionQueryParams) =>
  httpService.get<IOfferCollection>(buildUrl(`facilities/${facilityId}/offers`, params));
