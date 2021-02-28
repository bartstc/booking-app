import React, { ReactNode } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  AlertStatus,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { mdiAlertCircle } from '@mdi/js';

import { SubmitButton } from '../Form';
import { Button } from '../Button';
import { Icon } from '../Icon';

interface IProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  iconPath?: string;
  header?: string | ReactNode;
  description?: string | ReactNode;
  status?: AlertStatus;
}

const colors = {
  info: 'blue',
  warning: 'orange',
  error: 'red',
  success: 'green',
};

const Confirm = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  iconPath = mdiAlertCircle,
  header = <FormattedMessage id='confirmation' defaultMessage='Confirmation' />,
  description = <FormattedMessage id='confirmation-description' defaultMessage='Are you sure to perform this operation?' />,
  status = 'warning',
}: IProps) => {
  const color = useColorModeValue(`${colors[status]}.500`, `${colors[status]}.300`);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <HStack fontSize={{ base: 'lg', md: 'xl' }} fontWeight='700' color={color}>
            <Icon path={iconPath} size='26px' color={color} />
            <Text>{header}</Text>
          </HStack>
          <Text mt={2}>{description}</Text>
        </ModalBody>
        <ModalFooter>
          <SubmitButton isLoading={isLoading} colorScheme={colors[status]} onClick={onConfirm} />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { Confirm };
