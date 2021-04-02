import { IQueryParams } from 'types';

import { EmployeeStatus } from './EmployeeStatus';

export interface IEmployeeCollectionQueryParams extends IQueryParams {
  status?: EmployeeStatus;
  query?: string;
}
