import { IContact } from 'shared/domain/types';

export interface BuildEmployeeDto {
  employeeName: string;
  position: string;
  contacts?: IContact[];
}
