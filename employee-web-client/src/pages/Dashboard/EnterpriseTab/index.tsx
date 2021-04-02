import React from 'react';

import { EnterpriseData } from 'modules/enterprise/containers/EnterpriseData';

import { DashboardTabs } from '../DashboardTabs';

const ReadEnterpriseTab = () => {
  return (
    <DashboardTabs>
      <EnterpriseData />
    </DashboardTabs>
  );
};

export default ReadEnterpriseTab;
