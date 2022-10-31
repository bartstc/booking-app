import React from 'react';
import { isMobile } from 'react-device-detect';

import { List } from './List';
import { FacilitiesTable } from './FacitiliesTable';

const FacilitiesCollection = () => {
  if (isMobile) {
    return <List />;
  }

  return <FacilitiesTable />;
};

export { FacilitiesCollection };
