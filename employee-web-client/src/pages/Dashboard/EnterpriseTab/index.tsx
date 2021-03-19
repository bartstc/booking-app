import React from 'react';

import { DashboardTabs } from '../DashboardTabs';
import { EditEnterpriseForm } from './EditEnterpriseForm';

const EnterpriseTab = () => {
  return (
    <DashboardTabs>
      <EditEnterpriseForm />
    </DashboardTabs>
  );
};

export default EnterpriseTab;
