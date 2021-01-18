import React from 'react';
import { useIntl } from 'react-intl';
import { mdiLockOpenVariantOutline } from '@mdi/js';

import { IconButton, IconButtonProps } from 'shared/Button';

import { useActivateEmployeeNotification } from './useAactivateEmployeeNotification';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  onClick: () => Promise<void>;
}

const ActivateEmployeeIconButton = ({ onClick, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { showFailureNotification, showSuccessNotification } = useActivateEmployeeNotification();

  return (
    <IconButton
      title={formatMessage({ id: 'activate-employee', defaultMessage: 'Activate employee' })}
      path={mdiLockOpenVariantOutline}
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

export { ActivateEmployeeIconButton };
