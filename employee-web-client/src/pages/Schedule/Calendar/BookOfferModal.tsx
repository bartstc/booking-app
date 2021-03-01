import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { AddReservationForm, useAddReservationNotification } from 'modules/schedule/application/bookOffer';
import { IAddReservationDto } from 'modules/schedule/dto';
import { useFacilityConsumer } from 'modules/context';
import { Button } from 'shared/Button';
import { SubmitButton } from 'shared/Form';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (model: IAddReservationDto) => void;
}

const BookOfferModal = ({ onClose, isOpen, onSubmit }: IProps) => {
  const { facilityId } = useFacilityConsumer();
  const { showSuccessNotification } = useAddReservationNotification();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='add-reservation' defaultMessage='Add reservation' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AddReservationForm
            facilityId={facilityId}
            onSubmit={model => {
              showSuccessNotification();
              onSubmit(model);
              onClose();
              console.log(model);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <SubmitButton colorScheme='green' type='submit' form='book-offer-form' />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { BookOfferModal };
