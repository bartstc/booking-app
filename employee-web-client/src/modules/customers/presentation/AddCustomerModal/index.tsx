import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';

import { Button } from 'shared/Button';
import { SubmitButton } from 'shared/Form';
import { createModalStore } from 'shared/Modal';

import { useFacilityContextSelector } from 'modules/context';
import { useAddCustomer } from 'modules/customers/infrastructure/command';

import { AddCustomerForm } from '../AddCustomerForm';
import { useAddCustomerNotification } from '../AddCustomerForm/useAddCustomerNotification';
import { IAddCustomerDto } from '../../application/types';

interface IProps {
  onSuccess?: (customerId: string, model: IAddCustomerDto) => void;
}

export const useAddCustomerModalStore = createModalStore();

const AddCustomerModal = ({ onSuccess }: IProps) => {
  const [isOpen, onClose] = useAddCustomerModalStore(store => [store.isOpen, store.onClose]);

  const { facilityId } = useFacilityContextSelector();

  const [handler, isLoading] = useAddCustomer(facilityId);
  const { showSuccessNotification, showFailureNotification } = useAddCustomerNotification();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='add-new-customer' defaultMessage='Add new customer' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AddCustomerForm
            onSubmit={async model => {
              try {
                const customerId = await handler(model);
                onSuccess?.(customerId, model);
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
          <SubmitButton isLoading={isLoading} colorScheme='green' type='submit' form='add-customer-form' />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddCustomerModal };
