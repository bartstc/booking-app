import React from 'react';
import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { TermSelector } from './TermSelector';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SelectDateModal = ({ isOpen, onClose, onOpen }: IProps) => {
  return (
    <>
      {' '}
      <Button onClick={onOpen}>
        <FormattedMessage id='select-date' defaultMessage='Select date' />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id='select-term-and-employee-header' defaultMessage='Select term and employee' />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <TermSelector />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue'>
              <FormattedMessage id='accept' defaultMessage='Accept' />
            </Button>
            <Button colorScheme='gray' ml={3} onClick={onClose}>
              <FormattedMessage id='close' defaultMessage='Close' />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { SelectDateModal };
