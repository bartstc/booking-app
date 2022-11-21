import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ContactStep as ContactStepComponent } from './index';

export default {
  title: 'modules/facility/AddFacilityForm/ContactStep',
  component: ContactStepComponent,
} as ComponentMeta<typeof ContactStepComponent>;

const Template: ComponentStory<typeof ContactStepComponent> = () => {
  return <ContactStepComponent />;
};

export const ContactStep = Template.bind({});
