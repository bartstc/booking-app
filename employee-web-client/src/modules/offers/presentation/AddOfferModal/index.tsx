import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';

import { Button } from 'shared/Button';
import { SubmitButton } from 'shared/Form';
import { createModalStore } from 'shared/Modal';

import { useFacilityContextSelector } from 'modules/context';

import { AddOfferForm, useAddOfferNotification } from '../AddOfferForm';
import { useAddOffer } from '../../infrastructure/command';

export const useAddOfferModalStore = createModalStore();

const AddOfferModal = () => {
  const [isOpen, onClose] = useAddOfferModalStore(store => [store.isOpen, store.onClose]);

  const { facilityId } = useFacilityContextSelector();

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
          <SubmitButton isLoading={isLoading} colorScheme='green' type='submit' form='add-offer-form' />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddOfferModal };
