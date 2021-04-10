import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './CustomersList';
import { Table } from './CustomersTable';

const CustomersCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <Table />;
};

export { CustomersCollection };
