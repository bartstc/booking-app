import { buildUrl } from 'utils';
import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { ICustomerCollection, ICustomerCollectionQueryParams } from '../../application/types';
import { UseQueryOptions } from 'react-query/types/react/types';

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

export const useCustomersQuery = (facilityId: string, params: object, options?: UseQueryOptions) => {
  return useSuspense(
    customersQueryKey(facilityId, params as ICustomerCollectionQueryParams),
    () => customersQuery(facilityId, params),
    options,
  ).data;
};
