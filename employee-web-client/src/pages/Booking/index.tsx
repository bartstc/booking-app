import React from 'react';

import { PageWrapper } from 'shared/Layout/Page';

import { withErrorBoundary } from 'shared/ErrorBoundary';

import { Header } from './Header';
import { CustomCalendar } from './CustomCalendar';

export interface BookingPageQueryParams {
  dateFrom: string;
  dateTo: string;
  employeeId?: string;
}

const Booking = () => {
  return (
    <PageWrapper maxW='1600px' spacing={4}>
      <Header />
      <CustomCalendar />
    </PageWrapper>
  );
};

export default withErrorBoundary(Booking);
