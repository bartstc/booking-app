import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiLockOutline } from '@mdi/js';
import { useDisclosure } from '@chakra-ui/react';

import { IconButton, IconButtonProps } from 'shared/Button';
import { Confirm } from 'shared/Confirm';

import { useDeactivateEmployeeNotification } from './useDeactivateEmployeeNotification';
import { useDeactivateEmployee } from '../../infrastructure/command';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  enterpriseId: string;
  employeeId: string;
}

const DeactivateEmployeeIconButton = ({ enterpriseId, employeeId, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showFailureNotification, showSuccessNotification } = useDeactivateEmployeeNotification();
  const [deactivate, isDeactivating] = useDeactivateEmployee(enterpriseId, employeeId);

  return (
    <>
      <Confirm
        isOpen={isOpen}
        isLoading={isDeactivating}
        onClose={onClose}
        onConfirm={() => {
          deactivate()
            .then(() => showSuccessNotification())
            .catch(() => showFailureNotification())
            .finally(() => onClose());
        }}
        description={
          <FormattedMessage
            id='deactivate-employee-confirmation-description'
            defaultMessage='Are you sure to perform this operation? No booking can be assigned to the employee.'
          />
        }
      />
      <IconButton
        isLoading={isDeactivating}
        title={formatMessage({ id: 'deactivate-employee', defaultMessage: 'Deactivate employee' })}
        path={mdiLockOutline}
        onClick={onOpen}
        size='sm'
        {...props}
      />
    </>
  );
};

export { DeactivateEmployeeIconButton };
