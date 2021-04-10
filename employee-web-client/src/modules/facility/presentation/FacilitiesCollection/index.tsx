import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './List';
import { Table } from './Table';

const FacilitiesCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <Table />;
};

export { FacilitiesCollection };
