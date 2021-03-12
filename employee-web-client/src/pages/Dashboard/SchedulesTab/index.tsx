import React from 'react';
import { Box } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';

import { withErrorBoundary } from 'shared/ErrorBoundary';

import { DashboardTabs } from '../DashboardTabs';
import { Table } from './Table';
import { List } from './List';

const SchedulesTab = () => {
  return (
    <DashboardTabs>
      <Box maxW='100%' m='0 auto'>
        {isMobile ? <List /> : <Table />}
      </Box>
    </DashboardTabs>
  );
};

export default withErrorBoundary(SchedulesTab);
