import { buildUrl } from 'utils';
import { httpService } from 'utils/http-service';

import { ICustomerCollection, ICustomerCollectionQueryParams } from '../../types';

export const getCustomersKey = (
  facilityId: string,
  params?: ICustomerCollectionQueryParams,
): [string, ICustomerCollectionQueryParams | undefined] => [`facilities/${facilityId}/customers`, params];

export const getCustomers = (facilityId: string, params: object) =>
  httpService.get<ICustomerCollection>(buildUrl(`facilities/${facilityId}/customers`, params));
