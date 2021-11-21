import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GridHeader } from 'shared/Grid';
import { HeaderCell } from 'shared/Filters';

const Header = () => {
  return (
    <GridHeader>
      <HeaderCell>
        <FormattedMessage id='full-name' defaultMessage='Full name' />
      </HeaderCell>
      <HeaderCell name='status' display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='status' defaultMessage='Status' />
      </HeaderCell>
      <HeaderCell display={{ base: 'none', md: 'flex' }}>
        <FormattedMessage id='position' defaultMessage='Position' />
      </HeaderCell>
      <HeaderCell>
        <FormattedMessage id='phone-number' defaultMessage='Phone number' />
      </HeaderCell>
      <HeaderCell isNumeric name='birthDate' display={{ base: 'none', lg: 'flex' }}>
        <FormattedMessage id='birth-date' defaultMessage='Birth date' />
      </HeaderCell>
      <HeaderCell>{''}</HeaderCell>
    </GridHeader>
  );
};

export { Header };
