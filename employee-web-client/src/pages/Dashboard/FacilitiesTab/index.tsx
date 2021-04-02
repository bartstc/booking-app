import React from 'react';

import { FacilitiesCollection } from 'modules/facility/containers/FacilitiesCollection';

import { DashboardTabs } from '../DashboardTabs';

const FacilitiesTab = () => {
  return (
    <DashboardTabs>
      <FacilitiesCollection />
    </DashboardTabs>
  );
};

export default FacilitiesTab;
