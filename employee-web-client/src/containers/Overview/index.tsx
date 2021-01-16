import React from 'react';
import { VStack } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { withErrorBoundary } from 'shared/ErrorBoundary';

import { Table } from './Table';
import { Panel } from './Panel';
import { Header } from './Header';
import { List } from './List';

const Overview = () => {
  return (
    <VStack spacing={{ base: 10, md: 16 }} w='100%' mt={{ base: 4, md: 10 }} px={{ base: 4, md: 8 }} maxW='1440px' margin='0 auto'>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Panel />
        {isMobile ? <List /> : <Table />}
      </VStack>
    </VStack>
  );
};

export default withErrorBoundary(Overview);
