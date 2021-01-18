import React from 'react';
import { useIntl } from 'react-intl';
import { mdiLockOutline } from '@mdi/js';

import { IconButton, IconButtonProps } from 'shared/Button';

import { useDeactivateEmployeeNotification } from './useDeactivateEmployeeNotification';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  onClick: () => Promise<void>;
}

const DeactivateEmployeeIconButton = ({ onClick, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { showFailureNotification, showSuccessNotification } = useDeactivateEmployeeNotification();

  return (
    <IconButton
      title={formatMessage({ id: 'deactivate-employee', defaultMessage: 'Deactivate employee' })}
      path={mdiLockOutline}
      onClick={() => {
        onClick()
          .then(() => {
            showSuccessNotification();
          })
          .catch(() => {
            showFailureNotification();
          });
      }}
      {...props}
    />
  );
};

export { DeactivateEmployeeIconButton };
