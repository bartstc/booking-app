import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

const Header = () => {
  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>
          <FormattedMessage id='enterprise-heading' defaultMessage='Dashboard' />
        </PageHeading>
        <PageSubheading>
          <FormattedMessage id='enterprise-subheading' defaultMessage='Manage your business like a boss' />
        </PageSubheading>
      </PageDescription>
    </PageHeader>
  );
};

export { Header };
