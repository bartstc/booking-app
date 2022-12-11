import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FacilityFixture, generateID } from 'utils';
import { managementMockService } from 'utils/mock';

import { CreateFacilityMultiStepForm } from './index';
import { FacilityFormStep, useFacilityFormStore } from './createFacilityFormStore';
import { CreateFacilityMapper } from 'modules/facility/application';

const ENTERPRISE_ID = generateID();
const EMPLOYEE_ID = generateID();

export default {
  title: 'modules/facility/AddFacilityForm/Form',
  component: CreateFacilityMultiStepForm,
  decorators: [
    Story => {
      managementMockService.post(`enterprises/${ENTERPRISE_ID}/facilities`, {});
      useFacilityFormStore.setState({
        data: CreateFacilityMapper.modelToForm(FacilityFixture.toStructure()),
        step: FacilityFormStep.Base_info,
      });

      return <Story />;
    },
  ],
} as ComponentMeta<typeof CreateFacilityMultiStepForm>;

const Template: ComponentStory<typeof CreateFacilityMultiStepForm> = () => {
  return <CreateFacilityMultiStepForm enterpriseId={ENTERPRISE_ID} employeeId={EMPLOYEE_ID} />;
};

export const Form = Template.bind({});
