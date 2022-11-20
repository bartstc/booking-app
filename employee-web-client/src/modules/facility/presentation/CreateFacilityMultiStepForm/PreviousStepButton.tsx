import React from 'react';
import { useIntl } from 'react-intl';
import { kebabCase } from 'lodash';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import { Button } from 'shared/Button';

import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';

interface IProps {
  formStep: FacilityFormStep;
}

const PreviousStepButton = ({ formStep }: IProps) => {
  const { formatMessage } = useIntl();
  const previous = useFacilityFormStore(store => store.previous);
  const step = useFacilityFormStore(store => store.step);

  return (
    <Button
      variant='outline'
      colorScheme='primary'
      id={`back-to-${kebabCase(formStep)}`}
      isDisabled={step === FacilityFormStep.Base_info}
      onClick={previous}
      leftIcon={<ChevronLeftIcon />}
    >
      {formatMessage({ id: 'previous-step', defaultMessage: 'Back' })}
    </Button>
  );
};

export { PreviousStepButton };
