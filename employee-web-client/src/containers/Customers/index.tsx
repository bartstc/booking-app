import React from 'react';
import { VStack } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { PageWrapper } from 'shared/Layout';
import { withErrorBoundary } from 'shared/ErrorBoundary';

import { Table } from './Table';
import { Panel } from './Panel';
import { Header } from './Header';
import { List } from './List';

const Customers = () => {
  return (
    <PageWrapper>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Panel />
        {isMobile ? <List /> : <Table />}
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Customers);
