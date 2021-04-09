import React from 'react';

import { FacilitiesCollection } from 'modules/facility/presentation';

import { DashboardTabs } from '../DashboardTabs';

const FacilitiesTab = () => {
  return (
    <DashboardTabs>
      <FacilitiesCollection />
    </DashboardTabs>
  );
};

export default FacilitiesTab;
