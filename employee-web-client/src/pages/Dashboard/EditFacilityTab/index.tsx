import React from 'react';

import { EditFacilityForm } from 'modules/facility/containers/EditFacilityForm';

import { DashboardTabs } from '../DashboardTabs';

const EditFacilityTab = () => {
  return (
    <DashboardTabs>
      <EditFacilityForm />
    </DashboardTabs>
  );
};

export default EditFacilityTab;
