import { IContact } from 'shared/domain/types';

export class EmployeeDto {
  employeeId: string;
  facilityId: string;
  name: string;
  position: string;
  contacts: IContact[];
}
