import React from 'react';

import { PageContainer } from 'shared/Layout/Page';

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
    <PageContainer maxW='1600px' spacing={4}>
      <Header />
      <CustomCalendar />
    </PageContainer>
  );
};

export default withErrorBoundary(Booking);
