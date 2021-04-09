import React from 'react';
import { useParams } from 'react-router-dom';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';
import { FacilityData } from 'modules/facility/presentation';

import { DashboardTabs } from '../DashboardTabs';

const FacilityTab = () => {
  const params = useParams<{ facilitySlug: string }>();
  const facility = useFacilityQuery(params.facilitySlug);

  return (
    <DashboardTabs>
      <FacilityData facility={facility} />
    </DashboardTabs>
  );
};

export default FacilityTab;
