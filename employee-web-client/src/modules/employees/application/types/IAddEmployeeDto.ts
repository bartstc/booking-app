import { IContact } from 'types';

export interface IAddEmployeeDto {
  employeeName: string;
  birthDate: string;
  employmentDate: string;
  employeeEmail: string;
  position: string;
  contacts: IContact[];
  password: string;
  facilityIds: string[];
}
