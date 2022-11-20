import React from 'react';
import { Progress } from '@chakra-ui/react';

import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';

const FormStepProgressBar = () => {
  const step = useFacilityFormStore(store => store.step);

  const getProgress = () => {
    switch (step) {
      case FacilityFormStep.Base_info:
        return 33.33;
      case FacilityFormStep.Working_hours:
        return 66.66;
      case FacilityFormStep.Contact:
        return 100;
    }
  };

  return <Progress hasStripe value={getProgress()} mb='5%' mx='5%' isAnimated />;
};

export { FormStepProgressBar };
