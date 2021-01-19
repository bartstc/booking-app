import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';

import { Button } from 'shared/Button';

import { useFacilityConsumer } from 'modules/context';
import { useAddOffer } from 'modules/offers/infrastructure/command';
import { AddOfferForm, useAddOfferNotification } from 'modules/offers/application/addOffer';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddOfferModal = ({ isOpen, onClose }: IProps) => {
  const { facilityId } = useFacilityConsumer();

  const [handler, isLoading] = useAddOffer(facilityId);
  const { showSuccessNotification, showFailureNotification } = useAddOfferNotification();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='add-new-offer' defaultMessage='Add new offer' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AddOfferForm
            onSubmit={async model => {
              try {
                await handler(model);
                showSuccessNotification();
              } catch (e) {
                showFailureNotification();
              } finally {
                onClose();
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isLoading} colorScheme='green' type='submit' form='add-offer-form'>
            <FormattedMessage id='submit' defaultMessage='Submit' />
          </Button>
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddOfferModal };
