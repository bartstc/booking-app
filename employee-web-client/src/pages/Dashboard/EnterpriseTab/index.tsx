import React from 'react';
import { VStack } from '@chakra-ui/react';

import { DashboardTabs } from '../DashboardTabs';
import { EnterpriseBody } from './EnterpriseBody';
import { EnterpriseDataPanel } from './EnterpriseDataPanel';

const ReadEnterpriseTab = () => {
  return (
    <DashboardTabs>
      <VStack spacing={6}>
        <EnterpriseDataPanel />
        <EnterpriseBody />
      </VStack>
    </DashboardTabs>
  );
};

export default ReadEnterpriseTab;
