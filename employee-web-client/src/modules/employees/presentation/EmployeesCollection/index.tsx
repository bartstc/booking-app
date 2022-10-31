import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './List';
import { EmployeesTable } from './EmployeesTable';

const EmployeesCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <EmployeesTable />;
};

export { EmployeesCollection };
