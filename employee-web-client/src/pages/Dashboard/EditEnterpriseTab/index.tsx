import React from 'react';

import { DashboardTabs } from '../DashboardTabs';
import { EditEnterpriseForm } from './EditEnterpriseForm';

const EditEnterpriseTab = () => {
  return (
    <DashboardTabs>
      <EditEnterpriseForm />
    </DashboardTabs>
  );
};

export default EditEnterpriseTab;
