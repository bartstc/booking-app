import { buildUrl } from 'utils';
import { managementHttpService, ServiceType } from 'utils/http';
import { useSuspense } from 'shared/Suspense';

import { IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../application/types';

export const employeesQueryKey = (
  enterpriseId: string,
  params?: IEmployeeCollectionQueryParams,
): [string, ServiceType, IEmployeeCollectionQueryParams | undefined] => [
  `enterprises/${enterpriseId}/employees`,
  ServiceType.Management,
  params,
];

export const employeesQuery = (enterpriseId: string, params?: IEmployeeCollectionQueryParams) =>
  managementHttpService.get<IEmployeeCollection>(buildUrl(`enterprises/${enterpriseId}/employees`, params));

export const useEmployeesQuery = (enterpriseId: string, params?: IEmployeeCollectionQueryParams) => {
  return useSuspense(employeesQueryKey(enterpriseId, params), () => employeesQuery(enterpriseId, params)).data;
};
