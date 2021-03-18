import React from 'react';
import { Box } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout/Page';

import { AddBookingForm } from 'modules/booking/application/addBooking';
import { useFacilityConsumer } from 'modules/context';

import { Header } from './Header';

const AddBooking = () => {
  const { facilityId } = useFacilityConsumer();

  return (
    <PageWrapper spacing={{ base: 6, md: 10 }}>
      <Header />
      <Box w='100%' maxW='700px' pb={{ base: 10, md: 16, lg: 20 }}>
        <AddBookingForm
          onSubmit={model => {
            console.log(model);
          }}
          facilityId={facilityId}
        />
      </Box>
    </PageWrapper>
  );
};

export default AddBooking;
