import { WeekDay } from '../types';

export const weekDayMessages: Record<string, { id: string; defaultMessage: string }> = {
  [WeekDay.Monday]: {
    id: 'weekday-monday',
    defaultMessage: 'Monday',
  },
  [WeekDay.Tuesday]: {
    id: 'weekday-tuesday',
    defaultMessage: 'Tuesday',
  },
  [WeekDay.Wednesday]: {
    id: 'weekday-wednesday',
    defaultMessage: 'Wednesday',
  },
  [WeekDay.Thursday]: {
    id: 'weekday-thursday',
    defaultMessage: 'Thursday',
  },
  [WeekDay.Friday]: {
    id: 'weekday-friday',
    defaultMessage: 'Friday',
  },
  [WeekDay.Saturday]: {
    id: 'weekday-saturday',
    defaultMessage: 'Saturday',
  },
  [WeekDay.Sunday]: {
    id: 'weekday-sunday',
    defaultMessage: 'Sunday',
  },
};
