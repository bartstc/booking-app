import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FacilityFixture, generateID } from 'utils';
import { managementMockService } from 'utils/mock';

import { SummaryStep as SummaryStepComponent } from './index';
import { useFacilityFormStore } from '../createFacilityFormStore';
import { CreateFacilityMapper } from '../../../application';
import { SubmitButton } from '../SubmitButton';

const ENTERPRISE_ID = generateID();
const EMPLOYEE_ID = generateID();

export default {
  title: 'modules/facility/AddFacilityForm/SummaryStep',
  component: SummaryStepComponent,
  decorators: [
    Story => {
      managementMockService.post(`enterprises/${ENTERPRISE_ID}/facilities`, {});
      useFacilityFormStore.setState({ data: CreateFacilityMapper.modelToForm(FacilityFixture.toStructure()) });

      return <Story />;
    },
  ],
} as ComponentMeta<typeof SummaryStepComponent>;

const Template: ComponentStory<typeof SummaryStepComponent> = () => {
  return (
    <SummaryStepComponent>
      <SubmitButton enterpriseId={ENTERPRISE_ID} employeeId={EMPLOYEE_ID} />
    </SummaryStepComponent>
  );
};

export const SummaryStep = Template.bind({});
