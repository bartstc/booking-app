import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CheckboxParent } from 'shared/Selectable';
import { GridHeader, HeaderCell } from 'shared/GridTable';

interface IProps {
  collectionIds: string[];
}

const Header = ({ collectionIds }: IProps) => {
  return (
    <GridHeader>
      <HeaderCell name='checkbox' withTooltip={false}>
        <CheckboxParent items={collectionIds} />
      </HeaderCell>
      <HeaderCell name='name'>
        <FormattedMessage id='offer-name' defaultMessage='Offer name' />
      </HeaderCell>
      <HeaderCell name='status'>
        <FormattedMessage id='status' defaultMessage='Status' />
      </HeaderCell>
      <HeaderCell name='duration' isNumeric>
        <FormattedMessage id='duration' defaultMessage='Duration' />
      </HeaderCell>
      <HeaderCell name='price' isNumeric>
        <FormattedMessage id='price' defaultMessage='Price' />
      </HeaderCell>
      <HeaderCell name='priceType'>
        <FormattedMessage id='price-type' defaultMessage='Price type' />
      </HeaderCell>
      <HeaderCell name='actions'>{''}</HeaderCell>
    </GridHeader>
  );
};

export { Header };
