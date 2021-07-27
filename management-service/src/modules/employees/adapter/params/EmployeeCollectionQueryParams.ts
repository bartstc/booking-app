import { QueryParams } from 'shared/core';

import { EmployeeStatus } from '../../domain';

export enum EmployeeCollectionOrder {
  Status = 'status',
  BirthDate = 'birthDate',
  EmploymentDate = 'employmentDate',
}

export interface EmployeeCollectionQueryParams extends QueryParams {
  query?: string;
  status?: EmployeeStatus;
}
