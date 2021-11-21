import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GridHeader } from 'shared/Grid';
import { HeaderCell } from 'shared/Filters';

const Header = () => {
  return (
    <GridHeader>
      <HeaderCell>
        <FormattedMessage id='offer-name' defaultMessage='Offer name' />
      </HeaderCell>
      <HeaderCell name='status' display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='status' defaultMessage='Status' />
      </HeaderCell>
      <HeaderCell isNumeric display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='duration' defaultMessage='Duration' />
      </HeaderCell>
      <HeaderCell isNumeric>
        <FormattedMessage id='price' defaultMessage='Price' />
      </HeaderCell>
      <HeaderCell name='priceType' display={{ base: 'none', lg: 'flex' }}>
        <FormattedMessage id='price-type' defaultMessage='Price type' />
      </HeaderCell>
      <HeaderCell>{''}</HeaderCell>
    </GridHeader>
  );
};

export { Header };
