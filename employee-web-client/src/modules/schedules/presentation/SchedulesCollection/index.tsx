import React from 'react';
import { isMobile } from 'react-device-detect';

import { SchedulesTable } from './SchedulesTable';
import { List } from './List';

const SchedulesCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <SchedulesTable />;
};

export { SchedulesCollection };
