import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GridHeader } from 'shared/Grid';
import { HeaderCell } from 'shared/Filters';

const Header = () => {
  return (
    <GridHeader>
      <HeaderCell>{''}</HeaderCell>
      <HeaderCell name='name'>
        <FormattedMessage id='facility-name' defaultMessage='Facility name' />
      </HeaderCell>
      <HeaderCell>
        <FormattedMessage id='phone-number' defaultMessage='Phone number' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='address' defaultMessage='Address' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='business-category' defaultMessage='Business category' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', lg: 'flex' }}>
        <FormattedMessage id='email' defaultMessage='Email' />
      </HeaderCell>
      <HeaderCell>{''}</HeaderCell>
    </GridHeader>
  );
};

export { Header };
