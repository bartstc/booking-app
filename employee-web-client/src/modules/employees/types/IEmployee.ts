import { IContact } from 'types';

import { EmployeeStatus } from './EmployeeStatus';

export interface IEmployee {
  employeeId: string;
  facilityId: string;
  status: EmployeeStatus;
  name: string;
  position: string;
  birthDate: Date;
  employmentDate: Date;
  contacts: IContact[];
}
