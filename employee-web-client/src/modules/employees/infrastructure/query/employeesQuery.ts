import { buildUrl } from 'utils';
import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../application/types';

export const employeesQueryKey = (
  facilityId: string,
  params?: IEmployeeCollectionQueryParams,
): [string, ServiceType, IEmployeeCollectionQueryParams | undefined] => [
  `facilities/${facilityId}/employees`,
  ServiceType.Management,
  params,
];

export const employeesQuery = (facilityId: string, params?: IEmployeeCollectionQueryParams) =>
  managementHttpService.get<IEmployeeCollection>(buildUrl(`facilities/${facilityId}/employees`, params));

export const useEmployeesQuery = (facilityId: string, params?: IEmployeeCollectionQueryParams) => {
  return useSuspense(employeesQueryKey(facilityId, params), () => employeesQuery(facilityId, params)).data;
};
