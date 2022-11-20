import React from 'react';
import { useIntl } from 'react-intl';
import { kebabCase } from 'lodash';

import { Button } from 'shared/Button';

import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';
import { ChevronRightIcon } from "@chakra-ui/icons";

interface IProps {
  formStep: FacilityFormStep;
}

const NextStepButton = ({ formStep }: IProps) => {
  const { formatMessage } = useIntl();
  const step = useFacilityFormStore(store => store.step);

  return (
    <Button
      variant='solid'
      colorScheme='primary'
      id={`go-to-${kebabCase(formStep)}`}
      isDisabled={step === FacilityFormStep.Contact}
      type='submit'
      rightIcon={<ChevronRightIcon />}
    >
      {formatMessage({ id: 'next-step', defaultMessage: 'Next' })}
    </Button>
  );
};

export { NextStepButton };
