import { IContact } from 'types';

export interface ICreateOwnerEmployeeDto {
  employeeName: string;
  birthDate: string;
  employmentDate: string;
  employeeEmail: string;
  position: string;
  contacts: IContact[];
}
