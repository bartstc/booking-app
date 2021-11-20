import React from 'react';
import { Badge } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { OfferStatus } from '../../application/types';

interface IProps {
  status: OfferStatus;
}

const OfferStatusBadge = ({ status }: IProps) => {
  return status === OfferStatus.Active ? (
    <Badge variant='subtle' colorScheme='green'>
      <FormattedMessage id='active' defaultMessage='Active' />
    </Badge>
  ) : (
    <Badge variant='subtle' colorScheme='red'>
      <FormattedMessage id='inactive' defaultMessage='Inactive' />
    </Badge>
  );
};

export { OfferStatusBadge };
