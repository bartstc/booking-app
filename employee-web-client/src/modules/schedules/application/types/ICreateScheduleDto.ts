import { IAddAvailableEmployeeDto } from './IAddAvailableEmployeeDto';

export interface ICreateScheduleDto {
  name: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  availabilities: Array<IAddAvailableEmployeeDto>;
}
