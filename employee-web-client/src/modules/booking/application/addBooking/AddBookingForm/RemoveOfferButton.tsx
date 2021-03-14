import React from 'react';
import { isMobile } from 'react-device-detect';
import { mdiDelete } from '@mdi/js';
import { useIntl } from 'react-intl';

import { IconButton, Button } from 'shared/Button';
import { Icon } from '../../../../../shared/Icon';

interface IProps {
  onClick: () => void;
}

const RemoveOfferButton = ({ onClick }: IProps) => {
  const { formatMessage } = useIntl();

  if (isMobile) {
    return (
      <IconButton
        title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
        colorScheme='red'
        path={mdiDelete}
        onClick={onClick}
        mt='32px !important'
      />
    );
  }

  return (
    <Button colorScheme='red' variant='ghost' onClick={onClick} mt='32px !important' leftIcon={<Icon path={mdiDelete} />}>
      {formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
    </Button>
  );
};

export { RemoveOfferButton };
