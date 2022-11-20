import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { WorkingDaysAndAddressStep as WorkingDaysAndAddressStepComponent } from './index';

export default {
  title: 'modules/facility/AddFacilityForm/WorkingDaysAndAddressStep',
  component: WorkingDaysAndAddressStepComponent,
} as ComponentMeta<typeof WorkingDaysAndAddressStepComponent>;

const Template: ComponentStory<typeof WorkingDaysAndAddressStepComponent> = () => {
  return <WorkingDaysAndAddressStepComponent />;
};

export const WorkingDaysAndAddressStep = Template.bind({});
