import { IContact } from 'types';

import { EmployeeStatus } from './EmployeeStatus';
import { IEmployeeScope } from './IEmployeeScope';

export interface IEmployee {
  employeeId: string;
  enterpriseId: string;
  status: EmployeeStatus;
  name: string;
  position: string;
  birthDate: Date;
  employmentDate: Date;
  contacts: IContact[];
  scope: IEmployeeScope;
}
