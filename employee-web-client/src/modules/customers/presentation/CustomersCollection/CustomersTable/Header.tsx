import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GridHeader } from 'shared/Grid';
import { HeaderCell } from 'shared/Filters';

const Header = () => {
  return (
    <GridHeader>
      <HeaderCell name='fullName'>
        <FormattedMessage id='full-name' defaultMessage='Full name' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='bookings' defaultMessage='Bookings' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='address' defaultMessage='Address' />
      </HeaderCell>
      <HeaderCell isNumeric>
        <FormattedMessage id='phone' defaultMessage='Phone number' />
      </HeaderCell>
      <HeaderCell isNumeric name='birthDate' display={{ base: 'none', lg: 'flex' }}>
        <FormattedMessage id='birth-date' defaultMessage='Birth date' />
      </HeaderCell>
      <HeaderCell>{''}</HeaderCell>
    </GridHeader>
  );
};

export { Header };
