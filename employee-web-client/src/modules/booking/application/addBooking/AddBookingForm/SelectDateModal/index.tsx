import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { useModal } from 'hooks';

import { TermSelector } from './TermSelector';

interface ModalProps {
  offerId: string;
}

interface IProps {
  offerId: string;
}

const SelectDateModal = ({ offerId }: IProps) => {
  const { isOpen, onOpen, onClose, data } = useModal<ModalProps>();
  const modalSize = useBreakpointValue({ base: 'sm', md: '2xl' });

  return (
    <>
      {' '}
      <Button onClick={() => onOpen({ offerId })}>
        <FormattedMessage id='select-date' defaultMessage='Select date' />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id='select-term-and-employee-header' defaultMessage='Select term and employee' />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={{ base: 2, md: 4 }} pb={6}>
            {data && <TermSelector offerId={data?.offerId} />}
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
