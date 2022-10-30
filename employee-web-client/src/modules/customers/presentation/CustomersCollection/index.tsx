import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './CustomersList';
import { CustomersTable } from './CustomersTableV2';

const CustomersCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <CustomersTable />;
};

export { CustomersCollection };
