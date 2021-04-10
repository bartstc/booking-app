import React from 'react';
import { VStack } from '@chakra-ui/react';

import { FacilitiesCollection } from 'modules/facility/presentation';

import { DashboardTabs } from '../DashboardTabs';
import { Panel } from './Panel';

const FacilitiesTab = () => {
  return (
    <DashboardTabs>
      <VStack spacing={6}>
        <Panel />
        <FacilitiesCollection />
      </VStack>
    </DashboardTabs>
  );
};

export default FacilitiesTab;
