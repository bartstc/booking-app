import { IContact } from 'shared/domain/types';

export interface AddEmployeeDto {
  employeeName: string;
  position: string;
  contacts?: IContact[];
}
