import { buildUrl } from 'utils';
import { managementHttpService, ServiceType } from 'utils/http';

import { IOfferCollection, IOfferCollectionQueryParams } from '../../types';

export const offersQueryKey = (
  facilityId: string,
  params?: IOfferCollectionQueryParams,
): [string, ServiceType, IOfferCollectionQueryParams | undefined] => [`facilities/${facilityId}/offers`, ServiceType.Management, params];

export const offersQuery = (facilityId: string, params: IOfferCollectionQueryParams) =>
  managementHttpService.get<IOfferCollection>(buildUrl(`facilities/${facilityId}/offers`, params));
