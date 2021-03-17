import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useBreakpointValue } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { useModal } from 'hooks';

import { TermSelector } from './TermSelector';

interface ModalProps {
  offerId: string;
  index: number;
}

interface IProps {
  offerId: string;
  index: number;
}

const SelectDateModal = ({ offerId, index }: IProps) => {
  const { isOpen, onOpen, onClose, data } = useModal<ModalProps>();
  const modalSize = useBreakpointValue({ base: 'sm', md: '2xl' });

  return (
    <>
      {' '}
      <Button isDisabled={!offerId} onClick={() => onOpen({ offerId, index })}>
        <FormattedMessage id='select-date-and-employee' defaultMessage='Select date and employee' />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id='select-term-and-employee-header' defaultMessage='Select term and employee' />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={{ base: 2, md: 4 }} pb={6}>
            {data && <TermSelector offerId={data!.offerId} index={index} onClose={onClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { SelectDateModal };
