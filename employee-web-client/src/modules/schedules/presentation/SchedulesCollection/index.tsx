import React from 'react';
import { isMobile } from 'react-device-detect';

import { Table } from './Table';
import { List } from './List';

const SchedulesCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <Table />;
};

export { SchedulesCollection };
