import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FacilityFixture } from 'utils';

import { CreateFacilityMultiStepForm } from './index';
import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';
import { CreateFacilityMapper } from 'modules/facility/application';

export default {
  title: 'modules/facility/AddFacilityForm/Form',
  component: CreateFacilityMultiStepForm,
  decorators: [
    Story => {
      useFacilityFormStore.setState({
        data: CreateFacilityMapper.modelToForm(FacilityFixture.toStructure()),
        step: FacilityFormStep.Base_info,
      });

      return <Story />;
    },
  ],
} as ComponentMeta<typeof CreateFacilityMultiStepForm>;

const Template: ComponentStory<typeof CreateFacilityMultiStepForm> = () => {
  return <CreateFacilityMultiStepForm />;
};

export const Form = Template.bind({});
