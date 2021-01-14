import { QueryParams } from 'shared/core';

import { EmployeeStatus } from '../../domain/types';

export interface EmployeeCollectionQueryParams extends QueryParams {
  query?: string;
  status?: EmployeeStatus;
}
