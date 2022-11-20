import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BaseInfoStep } from './index';

export default {
  title: 'modules/facility/AddFacilityForm/BaseInfoStep',
  component: BaseInfoStep,
} as ComponentMeta<typeof BaseInfoStep>;

const Template: ComponentStory<typeof BaseInfoStep> = () => {
  return <BaseInfoStep />;
};

export const Default = Template.bind({});
