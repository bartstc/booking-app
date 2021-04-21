import { IAddAvailableEmployeeDto } from './IAddAvailableEmployeeDto';

export interface IAddAvailabilitiesDto {
  dateFrom: string;
  dateTo: string;
  availabilities: IAddAvailableEmployeeDto[];
}
