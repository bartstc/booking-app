import { buildUrl } from 'utils';
import { managementHttpService } from 'utils/http';

import { IOfferCollection, IOfferCollectionQueryParams } from '../../types';

export const getOffersKey = (
  facilityId: string,
  params?: IOfferCollectionQueryParams,
): [string, IOfferCollectionQueryParams | undefined] => [`facilities/${facilityId}/offers`, params];

export const getOffers = (facilityId: string, params: IOfferCollectionQueryParams) =>
  managementHttpService.get<IOfferCollection>(buildUrl(`facilities/${facilityId}/offers`, params));
