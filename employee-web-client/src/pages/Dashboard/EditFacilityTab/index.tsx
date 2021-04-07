import React from 'react';

import { EditFacilityForm } from 'modules/facility/presentation/EditFacilityForm';

import { DashboardTabs } from '../DashboardTabs';

const EditFacilityTab = () => {
  return (
    <DashboardTabs>
      <EditFacilityForm />
    </DashboardTabs>
  );
};

export default EditFacilityTab;
