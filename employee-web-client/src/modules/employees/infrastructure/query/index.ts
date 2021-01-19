import { buildUrl } from 'utils';
import { httpService } from 'utils/http-service';

import { IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../types';

export const getEmployeesKey = (
  facilityId: string,
  params?: IEmployeeCollectionQueryParams,
): [string, IEmployeeCollectionQueryParams | undefined] => [`facilities/${facilityId}/employees`, params];

export const getEmployees = (facilityId: string, params: IEmployeeCollectionQueryParams) =>
  httpService.get<IEmployeeCollection>(buildUrl(`facilities/${facilityId}/employees`, params));
