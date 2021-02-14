import React from 'react';

import { OverviewTabs } from '../OverviewTabs';
import { EditEnterpriseForm } from './EditEnterpriseForm';

const EnterpriseTab = () => {
  return (
    <OverviewTabs>
      <EditEnterpriseForm />
    </OverviewTabs>
  );
};

export default EnterpriseTab;
