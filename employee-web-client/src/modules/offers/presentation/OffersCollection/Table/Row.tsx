import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CheckableCell, GridItem, TruncatedCell } from 'shared/Grid';
import { MoneyText } from 'shared/Money';

import { StatusActionButtons } from './StatusActionButtons';
import { OfferStatusBadge } from '../../OfferStatusBadge';
import { PriceModelBadge } from '../../PriceModelBadge';
import { IOffer } from '../../../application/types';

interface IProps {
  offer: IOffer;
}

const Row = ({ offer }: IProps) => {
  return (
    <GridItem>
      <CheckableCell value={offer.offerId} />
      <TruncatedCell isBold>{offer.name}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>
        <OfferStatusBadge status={offer.status} />
      </TruncatedCell>
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
