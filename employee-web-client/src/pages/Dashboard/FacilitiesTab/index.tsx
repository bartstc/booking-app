import React from 'react';

import { FacilitiesCollection } from 'modules/facility/presentation/FacilitiesCollection';

import { DashboardTabs } from '../DashboardTabs';

const FacilitiesTab = () => {
  return (
    <DashboardTabs>
      <FacilitiesCollection />
    </DashboardTabs>
  );
};

export default FacilitiesTab;
