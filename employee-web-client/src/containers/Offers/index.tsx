import React from 'react';
import { VStack } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { PageWrapper } from 'shared/Layout/Page';

import { Header } from './Header';
import { Panel } from './Panel';
import { List } from './List';
import { Table } from './Table';

const Offers = () => {
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

export default Offers;
