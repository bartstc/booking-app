import React from 'react';
import { VStack } from '@chakra-ui/react';

import { DashboardTabs } from '../DashboardTabs';
import { EnterpriseData } from './EnterpriseData';
import { EnterpriseDataPanel } from './EnterpriseDataPanel';

const ReadEnterpriseTab = () => {
  return (
    <DashboardTabs>
      <VStack spacing={6}>
        <EnterpriseDataPanel />
        <EnterpriseData />
      </VStack>
    </DashboardTabs>
  );
};

export default ReadEnterpriseTab;
