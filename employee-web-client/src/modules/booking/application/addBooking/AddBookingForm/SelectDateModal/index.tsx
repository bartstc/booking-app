import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useBreakpointValue } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { mdiClock } from '@mdi/js';

import { Button } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { useModal } from 'hooks';

import { TermSelector } from './TermSelector';

interface ModalProps {
  offerId: string;
  index: number;
}

interface IProps {
  offerId: string;
  index: number;
  isFilled: boolean;
}

const SelectDateModal = ({ offerId, index, isFilled }: IProps) => {
  const { isOpen, onOpen, onClose, data } = useModal<ModalProps>();
  const modalSize = useBreakpointValue({ base: 'sm', md: '2xl' });

  return (
    <>
      {' '}
      <Button
        leftIcon={<Icon path={mdiClock} size='18px' />}
        isDisabled={!offerId}
        colorScheme={isFilled ? 'gray' : 'primary'}
        onClick={() => onOpen({ offerId, index })}
      >
        {isFilled ? (
          <FormattedMessage id='edit-date-and-employee' defaultMessage='Edit date and employee' />
        ) : (
          <FormattedMessage id='select-date-and-employee' defaultMessage='Select date and employee' />
        )}
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
