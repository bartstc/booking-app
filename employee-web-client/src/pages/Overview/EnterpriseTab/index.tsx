import React from 'react';

import { UnderConstructionState } from 'shared/States';

import { OverviewTabs } from '../OverviewTabs';

const EnterpriseTab = () => {
  return (
    <OverviewTabs>
      <UnderConstructionState />
    </OverviewTabs>
  );
};

export default EnterpriseTab;
