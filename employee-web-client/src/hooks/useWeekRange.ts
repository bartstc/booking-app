import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { dayjs } from 'utils/dayjs';

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

  const [trackedDay, setTrackedDay] = useState(dayWithinWeek);
  const [sunday, setSunday] = useState(trackedDay.weekday(sundayIndex));
  const [saturday, setSaturday] = useState(trackedDay.weekday(saturdayIndex));

  const getWeekDates = () => {
    const weekDates = [];

    let currentDate = sunday;

    while (currentDate.isBefore(saturday.add(1, 'day'))) {
      weekDates.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }

    return weekDates;
  };

  const setWeek = (date: Dayjs) => {
    setTrackedDay(date);
    setSunday(date.weekday(sundayIndex));
    setSaturday(date.weekday(saturdayIndex));
  };

  const nextWeek = () => {
    setTrackedDay(date => date.add(weekDayCount, 'day'));
    setSunday(date => date.add(weekDayCount, 'day'));
    setSaturday(date => date.add(weekDayCount, 'day'));
  };

  const prevWeek = () => {
    setTrackedDay(date => date.add(-weekDayCount, 'day'));
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

  const isInRange = (date: Dayjs) => {
    const resetDate = (date: Dayjs) => date.hour(0).minute(0).second(0).millisecond(0);
    const start = resetDate(minDate).add(-1, 'day');
    const end = resetDate(maxDate).add(1, 'day');

    return resetDate(date).isAfter(start) && resetDate(date).isBefore(end);
  };

  return {
    sunday,
    saturday,
    trackedDay,
    nextWeek,
    prevWeek,
    setWeek,
    isNextWeekNotAllowed: isNextWeekNotAllowed(),
    isPrevWeekNotAllowed: isPrevWeekNotAllowed(),
    weekDates: getWeekDates(),
    isInRange,
  };
};
