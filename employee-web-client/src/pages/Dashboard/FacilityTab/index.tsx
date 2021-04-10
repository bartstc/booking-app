import React from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';
import { FacilityBody } from 'modules/facility/presentation';

import { DashboardTabs } from '../DashboardTabs';
import { FacilityPanel } from './FacilityPanel';

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
