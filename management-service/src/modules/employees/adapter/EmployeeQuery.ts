import { QueryListResult } from 'shared/core';

import { EmployeeDto } from '../application/dto';
import { EmployeeCollectionQueryParams } from './params';

export interface EmployeeQuery {
  getEmployeeById(employeeId: string): Promise<EmployeeDto>;
  getEmployeeByEmail(employeeEmail: string): Promise<EmployeeDto>;
  getEmployees(
    enterpriseId: string,
    params: EmployeeCollectionQueryParams,
  ): Promise<QueryListResult<EmployeeDto>>;
}
