import React from 'react';
import { VStack } from '@chakra-ui/react';

import { EnterpriseBody } from 'modules/enterprise/presentation';

import { DashboardTabs } from '../DashboardTabs';
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
