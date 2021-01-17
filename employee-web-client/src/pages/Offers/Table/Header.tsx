import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GridHeader } from 'shared/Grid';
import { HeaderCell } from 'shared/Filters';

const Header = () => {
  return (
    <GridHeader>
      <HeaderCell>
        <FormattedMessage id='lp-label' defaultMessage='Lp' />
      </HeaderCell>
      <HeaderCell>
        <FormattedMessage id='offer-name' defaultMessage='Offer name' />
      </HeaderCell>
      <HeaderCell name='status' display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='status' defaultMessage='Status' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='duration' defaultMessage='Duration' />
      </HeaderCell>
      <HeaderCell>
        <FormattedMessage id='price' defaultMessage='Price' />
      </HeaderCell>
      <HeaderCell name='priceType' display={{ base: 'none', lg: 'flex' }}>
        <FormattedMessage id='price-type' defaultMessage='Price type' />
      </HeaderCell>
    </GridHeader>
  );
};

export { Header };
