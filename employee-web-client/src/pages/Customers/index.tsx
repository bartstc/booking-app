import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { CustomersCollection } from 'modules/customers/presentation';

import { Header } from './Header';
import { Panel } from './Panel';

const Customers = () => {
  return (
    <PageWrapper>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Panel />
        <CustomersCollection />
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Customers);
