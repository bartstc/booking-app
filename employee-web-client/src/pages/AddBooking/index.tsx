import React from 'react';
import { Box } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout/Page';

import { AddBookingForm, useAddBookingNotification } from 'modules/booking/presentation';
import { useAddBooking } from 'modules/booking/infrastructure/command';
import { useFacilityContextSelector } from 'modules/context';

import { Header } from './Header';

const AddBooking = () => {
  const facilityId = useFacilityContextSelector(state => state.facilityId);
  const [addBooking, isLoading] = useAddBooking(facilityId);
  const { showFailureNotification, showSuccessNotification } = useAddBookingNotification();

  return (
    <PageWrapper spacing={{ base: 6, md: 10 }}>
      <Header />
      <Box w='100%' maxW='700px' pb={{ base: 10, md: 16, lg: 20 }}>
        <AddBookingForm
          onSubmit={async model => {
            try {
              await addBooking(model);
              showSuccessNotification();
            } catch {
              showFailureNotification();
            }
          }}
          facilityId={facilityId}
          isLoading={isLoading}
        />
      </Box>
    </PageWrapper>
  );
};

export default AddBooking;
