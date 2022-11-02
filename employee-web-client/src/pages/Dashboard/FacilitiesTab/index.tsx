import React from 'react';
import { VStack } from '@chakra-ui/react';

import { withPaginationParamsCorrector } from 'shared/Params';

import { FacilitiesCollection } from 'modules/facility/presentation';
import { DEFAULT_PARAMS } from 'utils/constant';

import { DashboardTabs } from '../DashboardTabs';
import { Panel } from './Panel';

const FacilitiesTab = () => {
  return (
    <DashboardTabs>
      <VStack>
        <Panel />
        <FacilitiesCollection />
      </VStack>
    </DashboardTabs>
  );
};

export default withPaginationParamsCorrector(DEFAULT_PARAMS)(FacilitiesTab);
