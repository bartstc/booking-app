import React from 'react';
import { useIntl } from 'react-intl';
import { mdiLockOutline } from '@mdi/js';

import { IconButton, IconButtonProps } from 'shared/Button';

import { useDeactivateOfferNotification } from './useDeactivateOfferNotification';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  onClick: () => Promise<void>;
}

const DeactivateOfferIconButton = ({ onClick, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { showFailureNotification, showSuccessNotification } = useDeactivateOfferNotification();

  return (
    <IconButton
      title={formatMessage({ id: 'deactivate-offer', defaultMessage: 'Deactivate offer' })}
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

export { DeactivateOfferIconButton };
