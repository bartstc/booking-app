import React from 'react';
import { useIntl } from 'react-intl';
import { useDisclosure } from '@chakra-ui/react';
import { mdiLockOpenVariantOutline } from '@mdi/js';

import { IconButton, IconButtonProps } from 'shared/Button';
import { Confirm } from 'shared/Confirm';

import { useActivateEmployeeNotification } from './useActivateEmployeeNotification';
import { useActivateEmployee } from '../../infrastructure/command';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  facilityId: string;
  employeeId: string;
}

const ActivateEmployeeIconButton = ({ facilityId, employeeId, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showFailureNotification, showSuccessNotification } = useActivateEmployeeNotification();
  const [activate, isActivating] = useActivateEmployee(facilityId, employeeId);

  return (
    <>
      <Confirm
        isOpen={isOpen}
        isLoading={isActivating}
        onClose={onClose}
        onConfirm={() => {
          activate()
            .then(() => showSuccessNotification())
            .catch(() => showFailureNotification())
            .finally(() => onClose());
        }}
        status='info'
      />
      <IconButton
        isLoading={isActivating}
        title={formatMessage({ id: 'activate-employee', defaultMessage: 'Activate employee' })}
        path={mdiLockOpenVariantOutline}
        onClick={onOpen}
        {...props}
      />
    </>
  );
};

export { ActivateEmployeeIconButton };
