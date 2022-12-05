import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FacilityFixture } from 'utils';

import { SummaryStep as SummaryStepComponent } from './index';
import { useFacilityFormStore } from '../createFacilityFormStore';
import { CreateFacilityMapper } from '../../../application';

export default {
  title: 'modules/facility/AddFacilityForm/SummaryStep',
  component: SummaryStepComponent,
  decorators: [
    Story => {
      useFacilityFormStore.setState({ data: CreateFacilityMapper.modelToForm(FacilityFixture.toStructure()) });

      return <Story />;
    },
  ],
} as ComponentMeta<typeof SummaryStepComponent>;

const Template: ComponentStory<typeof SummaryStepComponent> = () => {
  return <SummaryStepComponent />;
};

export const SummaryStep = Template.bind({});
