import React from 'react';
import { Badge, Flex } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { GridItem, TruncatedCell } from 'shared/Grid';

import { StatusActionButtons } from './StatusActionButtons';
import { OfferStatusBadge } from '../../shared/OfferStatusBadge';
import { PriceModelBadge } from '../../shared/PriceModelBadge';
import { IOffer } from '../../../application/types';

interface IProps {
  index: number;
  offer: IOffer;
}

const Row = ({ index, offer }: IProps) => {
  return (
    <GridItem>
      <TruncatedCell>{index}</TruncatedCell>
      <TruncatedCell>{offer.name}</TruncatedCell>
      <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
        <OfferStatusBadge status={offer.status} />
      </Flex>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>
        {offer.duration} <FormattedMessage id='minutes-short' defaultMessage='min' />
      </TruncatedCell>
      <TruncatedCell>
        <Badge variant='solid' colorScheme='yellow'>
          {offer.price.value} {offer.price.currency}
        </Badge>
      </TruncatedCell>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>
        <PriceModelBadge type={offer.price.type} />
      </TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <StatusActionButtons offerId={offer.offerId} status={offer.status} />
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };
