import React from 'react';
import { useIntl } from 'react-intl';
import { mdiLockOpenVariantOutline } from '@mdi/js';
import { useDisclosure } from '@chakra-ui/react';

import { IconButton, IconButtonProps } from 'shared/Button';
import { Confirm } from 'shared/Confirm';

import { useActivateOfferNotification } from './useAactivateOfferNotification';
import { useActivateOffer } from '../../infrastructure/command';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  facilityId: string;
  offerId: string;
}

const ActivateOfferIconButton = ({ offerId, facilityId, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showFailureNotification, showSuccessNotification } = useActivateOfferNotification();
  const [activate, isActivating] = useActivateOffer(facilityId, offerId);

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
        title={formatMessage({ id: 'activate-offer', defaultMessage: 'Activate offer' })}
        path={mdiLockOpenVariantOutline}
        onClick={onOpen}
        {...props}
      />
    </>
  );
};

export { ActivateOfferIconButton };
