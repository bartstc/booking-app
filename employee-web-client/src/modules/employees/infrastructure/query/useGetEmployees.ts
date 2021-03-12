import { buildUrl } from 'utils';
import { managementHttpService } from 'utils/http';

import { IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../types';

export const getEmployeesKey = (
  facilityId: string,
  params?: IEmployeeCollectionQueryParams,
): [string, IEmployeeCollectionQueryParams | undefined] => [`facilities/${facilityId}/employees`, params];

export const getEmployees = (facilityId: string, params: IEmployeeCollectionQueryParams) =>
  managementHttpService.get<IEmployeeCollection>(buildUrl(`facilities/${facilityId}/employees`, params));
