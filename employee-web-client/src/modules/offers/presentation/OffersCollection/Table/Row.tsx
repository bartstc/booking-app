import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CheckableRowCell, GridRow, RowCell } from 'shared/GridTable';
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
    <GridRow>
      <CheckableRowCell name='checkbox' value={offer.offerId} />
      <RowCell name='name' isBold>
        {offer.name}
      </RowCell>
      <RowCell name='status'>
        <OfferStatusBadge status={offer.status} />
      </RowCell>
      <RowCell name='duration' isNumeric>
        {offer.duration} <FormattedMessage id='minutes-short' defaultMessage='min' />
      </RowCell>
      <RowCell name='price' isNumeric>
        <MoneyText value={offer.price.value} currency={offer.price.currency} />
      </RowCell>
      <RowCell name='priceType'>
        <PriceModelBadge type={offer.price.type} />
      </RowCell>
      <RowCell name='actions' justify='flex-end'>
        <StatusActionButtons offerId={offer.offerId} status={offer.status} />
      </RowCell>
    </GridRow>
  );
};

export { Row };
