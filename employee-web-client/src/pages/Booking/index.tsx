import React from 'react';

import { PageWrapper } from 'shared/Layout/Page';

import { Calendar } from './Calendar';
import { Header } from './Header';

const Booking = () => {
  return (
    <PageWrapper>
      <Header />
      <Calendar />
    </PageWrapper>
  );
};

export default Booking;
