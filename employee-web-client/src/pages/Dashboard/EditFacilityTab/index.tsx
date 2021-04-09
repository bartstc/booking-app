import React from 'react';

import { EditFacilityForm } from 'modules/facility/presentation';

import { DashboardTabs } from '../DashboardTabs';

const EditFacilityTab = () => {
  return (
    <DashboardTabs>
      <EditFacilityForm />
    </DashboardTabs>
  );
};

export default EditFacilityTab;
