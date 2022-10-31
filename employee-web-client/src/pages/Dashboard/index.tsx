import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { PageContainer } from 'shared/Layout';
import { Spinner } from 'shared/Spinner';
import { CollectionContainer } from 'shared/Collection';

import { Header } from './Header';

const Dashboard = () => {
  return (
    <PageContainer spacing={{ base: 6, md: 10 }}>
      <Header />
      <CollectionContainer>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </CollectionContainer>
    </PageContainer>
  );
};

export default withErrorBoundary(Dashboard);
