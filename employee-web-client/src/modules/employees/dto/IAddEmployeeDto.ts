import { IContact } from 'types';

export interface IAddEmployeeDto {
  employeeName: string;
  birthDate: string;
  employmentDate: string;
  position: string;
  contacts: IContact[];
}
