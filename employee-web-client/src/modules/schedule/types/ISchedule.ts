import { IAvailableEmployee } from './IAvailableEmployee';

export interface ISchedule {
  name: string;
  startDate: string;
  endDate: string;
  creationDate: string;
  availabilities: Array<IAvailableEmployee>;
}
