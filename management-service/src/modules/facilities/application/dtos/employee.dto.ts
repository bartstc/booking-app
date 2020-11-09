import { IContact } from 'shared/domain/types';

import { EmployeePosition } from '../../domain/types';

export class EmployeeDto {
  employeeId: string;
  facilityId: string;
  name: string;
  position: EmployeePosition;
  employmentDate: string;
  contacts: IContact[];
}
