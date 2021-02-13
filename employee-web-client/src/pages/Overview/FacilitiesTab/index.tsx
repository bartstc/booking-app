import React from 'react';
import { isMobile } from 'react-device-detect';
import { Box } from '@chakra-ui/react';

import { Panel } from './Panel';
import { List } from './List';
import { Table } from './Table';
import { OverviewTabs } from '../OverviewTabs';

const FacilitiesTab = () => {
  return (
    <OverviewTabs>
      <Panel />
      <Box maxW='1000px' m='0 auto' mt={{ base: 6, md: 10 }}>
        {isMobile ? <List /> : <Table />}
      </Box>
    </OverviewTabs>
  );
};

export default FacilitiesTab;
