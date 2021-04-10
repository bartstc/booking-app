import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './List';
import { Table } from './Table';

const OffersCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <Table />;
};

export { OffersCollection };
