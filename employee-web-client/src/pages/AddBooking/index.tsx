import React from 'react';
import { Box } from '@chakra-ui/react';

import { PageContainer } from 'shared/Layout/Page';

import { AddBookingForm, useAddBookingNotification } from 'modules/booking/presentation';
import { useAddBooking } from 'modules/booking/infrastructure/command';
import { useFacilityContextSelector } from 'modules/context';

import { Header } from './Header';

const AddBooking = () => {
  const facilityId = useFacilityContextSelector(state => state.facilityId);
  const [addBooking, isLoading] = useAddBooking(facilityId);
  const { showFailureNotification, showSuccessNotification } = useAddBookingNotification();

  return (
    <PageContainer maxW='1300px'>
      <Header />
      <Box w='100%'>
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
    </PageContainer>
  );
};

export default AddBooking;
