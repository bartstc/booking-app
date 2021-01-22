import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';

import { Button } from 'shared/Button';

import { useFacilityConsumer } from 'modules/context';
import { useAddCustomer } from 'modules/customers/infrastructure/command';
import { AddCustomerForm, useAddCustomerNotification } from 'modules/customers/application/addCustomer';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCustomerModal = ({ isOpen, onClose }: IProps) => {
  const { facilityId } = useFacilityConsumer();

  const [handler, isLoading] = useAddCustomer(facilityId);
  const { showSuccessNotification, showFailureNotification } = useAddCustomerNotification();

  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} size='xl'>
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
          <Button isLoading={isLoading} colorScheme='green' type='submit' form='add-customer-form'>
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

export { AddCustomerModal };
