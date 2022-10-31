import React from 'react';

import { PageContainer } from 'shared/Layout';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { CustomersCollection } from 'modules/customers/presentation';
import { CollectionContainer } from 'shared/Collection';

import { Header } from './Header';
import { Panel } from './Panel';

const Customers = () => {
  return (
    <PageContainer>
      <Header />
      <CollectionContainer>
        <Panel />
        <CustomersCollection />
      </CollectionContainer>
    </PageContainer>
  );
};

export default withErrorBoundary(Customers);
