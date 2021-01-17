import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';

import { Button } from 'shared/Button';
import { AddEmployeeForm } from 'modules/employees/application/addEmployee';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal scrollBehavior='inside' isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='add-new-employee' defaultMessage='Add new employee' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddEmployeeForm />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddEmployeeModal };
