import React from 'react';
import { VStack } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { PageWrapper } from 'shared/Layout';

import { Table } from './Table';
import { Panel } from './Panel';
import { Header } from './Header';
import { List } from './List';

const Overview = () => {
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

export default withErrorBoundary(Overview);
