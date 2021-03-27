import React from 'react';
import { isMobile } from 'react-device-detect';
import { VStack } from '@chakra-ui/react';

import { Panel } from './Panel';
import { List } from './List';
import { Table } from './Table';
import { DashboardTabs } from '../DashboardTabs';

const FacilitiesTab = () => {
  return (
    <DashboardTabs>
      <VStack spacing={6}>
        <Panel />
        {isMobile ? <List /> : <Table />}
      </VStack>
    </DashboardTabs>
  );
};

export default FacilitiesTab;
