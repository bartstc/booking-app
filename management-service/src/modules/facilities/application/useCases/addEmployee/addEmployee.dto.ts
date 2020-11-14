import { IContact } from 'shared/domain/types';

import { EmployeePosition } from '../../../domain/types';

export interface AddEmployeeDto {
  employeeName: string;
  position: EmployeePosition;
  employmentDate: string;
  contacts?: IContact[];
}
