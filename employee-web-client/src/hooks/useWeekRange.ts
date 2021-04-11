import dayjs, { Dayjs, extend } from 'dayjs';
import { useState } from 'react';
import weekday from 'dayjs/plugin/weekday';

extend(weekday);

interface Props {
  dayWithinWeek?: Dayjs;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export const useWeekRange = ({
  dayWithinWeek = dayjs(),
  minDate = dayjs().year(1900).month(1).day(1),
  maxDate = dayjs().year(2100).month(1).day(1),
}: Props) => {
  const sundayIndex = 0;
  const saturdayIndex = 6;
  const weekDayCount = 7;

  const [sunday, setSunday] = useState(dayWithinWeek.weekday(sundayIndex));
  const [saturday, setSaturday] = useState(dayWithinWeek.weekday(saturdayIndex));

  const getWeekDates = () => {
    const weekDates = [];

    let currentDate = sunday;

    while (currentDate.isBefore(saturday.add(1, 'day'))) {
      weekDates.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }

    return weekDates;
  };

  const nextWeek = () => {
    setSunday(date => date.add(weekDayCount, 'day'));
    setSaturday(date => date.add(weekDayCount, 'day'));
  };

  const prevWeek = () => {
    setSunday(date => date.add(-weekDayCount, 'day'));
    setSaturday(date => date.add(-weekDayCount, 'day'));
  };

  const isNextWeekNotAllowed = () => {
    return getWeekDates()
      .map(date => date.format('D-M'))
      .some(value => value === maxDate.format('D-M'));
  };

  const isPrevWeekNotAllowed = () => {
    return getWeekDates()
      .map(date => date.format('D-M'))
      .some(value => value === minDate.format('D-M'));
  };

  return {
    sunday,
    saturday,
    nextWeek,
    prevWeek,
    isNextWeekNotAllowed: isNextWeekNotAllowed(),
    isPrevWeekNotAllowed: isPrevWeekNotAllowed(),
    weekDates: getWeekDates(),
  };
};
