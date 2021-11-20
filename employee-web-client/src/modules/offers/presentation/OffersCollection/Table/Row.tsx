import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { MoneyText } from 'shared/Money';

import { StatusActionButtons } from './StatusActionButtons';
import { OfferStatusBadge } from '../../OfferStatusBadge';
import { PriceModelBadge } from '../../PriceModelBadge';
import { IOffer } from '../../../application/types';

interface IProps {
  index: number;
  offer: IOffer;
}

const Row = ({ index, offer }: IProps) => {
  return (
    <GridItem>
      <TruncatedCell>{index}</TruncatedCell>
      <TruncatedCell isBold>{offer.name}</TruncatedCell>
      <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
        <OfferStatusBadge status={offer.status} />
      </Flex>
      <TruncatedCell isNumeric display={{ base: 'none', md: 'flex' }}>
        {offer.duration} <FormattedMessage id='minutes-short' defaultMessage='min' />
      </TruncatedCell>
      <TruncatedCell isNumeric>
        <MoneyText value={offer.price.value} currency={offer.price.currency} />
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
