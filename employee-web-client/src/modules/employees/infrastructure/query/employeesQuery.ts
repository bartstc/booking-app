import { buildUrl } from 'utils';
import { managementHttpService, ServiceType } from 'utils/http';

import { IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../types';

export const employeesQueryKey = (
  facilityId: string,
  params?: IEmployeeCollectionQueryParams,
): [string, ServiceType, IEmployeeCollectionQueryParams | undefined] => [
  `facilities/${facilityId}/employees`,
  ServiceType.Management,
  params,
];

export const employeesQuery = (facilityId: string, params: IEmployeeCollectionQueryParams) =>
  managementHttpService.get<IEmployeeCollection>(buildUrl(`facilities/${facilityId}/employees`, params));
