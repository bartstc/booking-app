import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiLockOutline } from '@mdi/js';
import { useDisclosure } from '@chakra-ui/react';

import { IconButton, IconButtonProps } from 'shared/Button';
import { Confirm } from 'shared/Confirm';

import { useDeactivateOffer } from '../../infrastructure/command';
import { useDeactivateOfferNotification } from '../../application';

interface IProps extends Omit<IconButtonProps, 'title' | 'onClick'> {
  facilityId: string;
  offerId: string;
}

const DeactivateOfferIconButton = ({ facilityId, offerId, ...props }: IProps) => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showFailureNotification, showSuccessNotification } = useDeactivateOfferNotification();
  const [deactivate, isDeactivating] = useDeactivateOffer(facilityId, offerId);

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
            id='deactivate-offer-confirmation-description'
            defaultMessage='Are you sure to perform this operation? Offer will not be available.'
          />
        }
      />
      <IconButton
        isLoading={isDeactivating}
        title={formatMessage({ id: 'deactivate-offer', defaultMessage: 'Deactivate offer' })}
        path={mdiLockOutline}
        onClick={onOpen}
        {...props}
      />
    </>
  );
};

export { DeactivateOfferIconButton };
