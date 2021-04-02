import React from 'react';
import { VStack } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { Panel } from './Panel';
import { List } from './List';
import { Table } from './Table';

const FacilitiesCollection = () => {
  return (
    <VStack spacing={6}>
      <Panel />
      {isMobile ? <List /> : <Table />}
    </VStack>
  );
};

export { FacilitiesCollection };
