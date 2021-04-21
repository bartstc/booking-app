import { IWorkingDay, WeekDay } from '../../facility/application/types';
import { weekDays } from './weekDays';

export const useFreeWeekDays = (workingDays: IWorkingDay[]) => {
  const isFree = (weekDay: WeekDay) => {
    const workingDay = workingDays.find(workingDay => workingDay.dayName === weekDay);

    if (!workingDay) {
      return true;
    }

    return workingDay.hours.length === 0;
  };

  const freeDays = weekDays.filter(weekDay => isFree(weekDay));

  const indexList: number[] = [];

  weekDays.forEach(weekDay => {
    if (freeDays.includes(weekDay)) {
      indexList.push(weekDays.indexOf(weekDay));
    }
  });

  return indexList;
};
