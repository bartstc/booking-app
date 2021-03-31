import React from 'react';
import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';

import { DashboardTabs } from '../DashboardTabs';
import { FacilityPanel } from './FacilityPanel';
import { FacilityBody } from './FacilityBody';

const FacilityTab = () => {
  const params = useParams<{ facilitySlug: string }>();
  const facility = useFacilityQuery(params.facilitySlug);

  return (
    <DashboardTabs>
      <VStack spacing={6}>
        <FacilityPanel facility={facility} />
        <FacilityBody facility={facility} />
      </VStack>
    </DashboardTabs>
  );
};

export default FacilityTab;
