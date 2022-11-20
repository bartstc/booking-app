import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BaseInfoStep as BaseInfoStepComponent } from './index';

export default {
  title: 'modules/facility/AddFacilityForm/BaseInfoStep',
  component: BaseInfoStepComponent,
} as ComponentMeta<typeof BaseInfoStepComponent>;

const Template: ComponentStory<typeof BaseInfoStepComponent> = () => {
  return <BaseInfoStepComponent />;
};

export const BaseInfoStep = Template.bind({});
