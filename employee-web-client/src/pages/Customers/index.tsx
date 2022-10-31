import React from 'react';

import { PageWrapper } from 'shared/Layout';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { CustomersCollection } from 'modules/customers/presentation';
import { CollectionContainer } from 'shared/Collection';

import { Header } from './Header';
import { Panel } from './Panel';

const Customers = () => {
  return (
    <PageWrapper>
      <Header />
      <CollectionContainer>
        <Panel />
        <CustomersCollection />
      </CollectionContainer>
    </PageWrapper>
  );
};

export default withErrorBoundary(Customers);
