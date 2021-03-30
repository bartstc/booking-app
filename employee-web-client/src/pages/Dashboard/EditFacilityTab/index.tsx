import React from 'react';

import { DashboardTabs } from '../DashboardTabs';
import { EditFacilityForm } from './EditFacilityForm';

const EditFacilityTab = () => {
  return (
    <DashboardTabs>
      <EditFacilityForm />
    </DashboardTabs>
  );
};

export default EditFacilityTab;
