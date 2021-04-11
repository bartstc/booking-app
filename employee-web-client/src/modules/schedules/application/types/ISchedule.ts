import { IAvailableEmployee } from './IAvailableEmployee';

export interface ISchedule {
  scheduleId: string;
  name: string;
  startDate: string;
  endDate: string;
  creationDate: string;
  availabilities: Array<IAvailableEmployee>;
}
