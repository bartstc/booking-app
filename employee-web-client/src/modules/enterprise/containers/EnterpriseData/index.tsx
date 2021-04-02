import React from 'react';
import { VStack } from '@chakra-ui/react';

import { EnterpriseDataPanel } from './EnterpriseDataPanel';
import { EnterpriseBody } from './EnterpriseBody';

const EnterpriseData = () => {
  return (
    <VStack spacing={6}>
      <EnterpriseDataPanel />
      <EnterpriseBody />
    </VStack>
  );
};

export { EnterpriseData };
