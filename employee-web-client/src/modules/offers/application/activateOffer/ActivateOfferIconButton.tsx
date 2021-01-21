import React from 'react';
import { useIntl } from 'react-intl';
import { mdiLockOpenVariantOutline } from '@mdi/js';

import { IconButton, IconButtonProps } from 'shared/Button';

import { useActivateOfferNotification } from './useAactivateOfferNotification';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  onClick: () => Promise<void>;
}

const ActivateOfferIconButton = ({ onClick, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { showFailureNotification, showSuccessNotification } = useActivateOfferNotification();

  return (
    <IconButton
      title={formatMessage({ id: 'activate-offer', defaultMessage: 'Activate offer' })}
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

export { ActivateOfferIconButton };
