import React, { Suspense } from 'react';
import { VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { PageContainer } from 'shared/Layout';
import { Spinner } from 'shared/Spinner';

import { Header } from './Header';

const Dashboard = () => {
  return (
    <PageContainer spacing={{ base: 6, md: 10 }}>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </VStack>
    </PageContainer>
  );
};

export default withErrorBoundary(Dashboard);
