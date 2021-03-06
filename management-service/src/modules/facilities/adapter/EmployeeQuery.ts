import { QueryListResult } from 'shared/core';

import { EmployeeDto } from '../application/dto';
import { EmployeeCollectionQueryParams } from './params';

export interface EmployeeQuery {
  getEmployeeById(employeeId: string): Promise<EmployeeDto>;
  getEmployees(
    facilityId: string,
    params: EmployeeCollectionQueryParams,
  ): Promise<QueryListResult<EmployeeDto>>;
}
