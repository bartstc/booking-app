import React from 'react';
import { VStack } from '@chakra-ui/react';

import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';
import { FormStepProgressBar } from './FormStepProgressBar';
import { BaseInfoStep } from './BaseInfoStep';
import { WorkingDaysAndAddressStep } from './WorkingDaysAndAddressStep';
import { ContactStep } from './ContactStep';
import { SummaryStep } from './SummaryStep';

const CreateFacilityMultiStepForm = () => {
  const step = useFacilityFormStore(store => store.step);

  return (
    <VStack display='stretch'>
      <FormStepProgressBar />
      {step === FacilityFormStep.Base_info && <BaseInfoStep />}
      {step === FacilityFormStep.Working_hours && <WorkingDaysAndAddressStep />}
      {step === FacilityFormStep.Contact && <ContactStep />}
      {step === FacilityFormStep.Summary && <SummaryStep />}
    </VStack>
  );
};

export { CreateFacilityMultiStepForm };
