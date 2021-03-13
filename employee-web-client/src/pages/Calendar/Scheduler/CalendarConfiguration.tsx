/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Calendar as ReactCalendar, CalendarProps, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import { IBookedOfferDto } from 'modules/schedule/dto/IBookedOfferDto';

import { StyleWrapper } from './StyleWrapper';
import { Event, EventWrapper } from './Event';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface IProps extends Omit<CalendarProps<IBookedOfferDto>, 'localizer'> {}

const CalendarConfiguration = (props: IProps) => {
  return (
    <StyleWrapper>
      <ReactCalendar
        localizer={localizer}
        startAccessor='dateFrom'
        endAccessor='dateTo'
        titleAccessor='name'
        resourceAccessor='employerId'
        resourceIdAccessor='employerId'
        resourceTitleAccessor='employerName'
        views={['month', 'week', 'day']}
        style={{ height: 640, width: 1200 }}
        components={{
          event: Event as any,
          eventWrapper: EventWrapper as any,
        }}
        {...(props as any)}
      />
    </StyleWrapper>
  );
};

export { CalendarConfiguration };
