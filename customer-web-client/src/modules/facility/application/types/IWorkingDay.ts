import { WeekDay } from './WeekDay';
import { IWorkingHours } from './IWorkingHours';

export interface IWorkingDay {
  dayName: WeekDay;
  hours: IWorkingHours[];
}
