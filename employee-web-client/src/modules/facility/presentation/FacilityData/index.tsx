import React from 'react';
import { VStack } from '@chakra-ui/react';

import { FacilityPanel } from './FacilityPanel';
import { FacilityBody } from './FacilityBody';
import { IFacility } from '../../application/types';

interface IProps {
  facility: IFacility;
}

const FacilityData = ({ facility }: IProps) => {
  return (
    <VStack spacing={6}>
      <FacilityPanel facility={facility} />
      <FacilityBody facility={facility} />
    </VStack>
  );
};

export { FacilityData };
