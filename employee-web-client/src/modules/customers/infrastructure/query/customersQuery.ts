import { buildUrl } from 'utils';
import { managementHttpService, ServiceType } from 'utils/http';

import { ICustomerCollection, ICustomerCollectionQueryParams } from '../../application/types';

export const customersQueryKey = (
  facilityId: string,
  params?: ICustomerCollectionQueryParams,
): [string, ServiceType, ICustomerCollectionQueryParams | undefined] => [
  `facilities/${facilityId}/customers`,
  ServiceType.Management,
  params,
];

export const customersQuery = (facilityId: string, params: object) =>
  managementHttpService.get<ICustomerCollection>(buildUrl(`facilities/${facilityId}/customers`, params));
