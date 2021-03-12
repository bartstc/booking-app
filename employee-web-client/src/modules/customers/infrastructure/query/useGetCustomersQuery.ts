import { buildUrl } from 'utils';
import { managementHttpService } from 'utils/http';

import { ICustomerCollection, ICustomerCollectionQueryParams } from '../../types';

export const getCustomersKey = (
  facilityId: string,
  params?: ICustomerCollectionQueryParams,
): [string, ICustomerCollectionQueryParams | undefined] => [`facilities/${facilityId}/customers`, params];

export const getCustomers = (facilityId: string, params: object) =>
  managementHttpService.get<ICustomerCollection>(buildUrl(`facilities/${facilityId}/customers`, params));
