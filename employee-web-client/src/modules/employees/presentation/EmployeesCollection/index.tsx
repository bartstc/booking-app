import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './List';
import { Table } from './Table';

const EmployeesCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <Table />;
};

export { EmployeesCollection };
