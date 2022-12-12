import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { FacilityFixture, generateID } from 'utils';
import { managementMockService } from 'utils/mock';

import { CreateFacilityMultiStepForm } from './index';
import { CreateFacilityMapper } from 'modules/facility/application';
import { BaseInfoStepPo } from './BaseInfoStep/BaseInfoStep.po';
import { WorkingDaysAndAddressStepPo } from './WorkingDaysAndAddressStep/WorkingDaysAndAddressStep.po';
import { ContactStepPo } from './ContactStep/ContactStep.po';
import { SummaryStepPo } from './SummaryStep/SummaryStep.po';

const ENTERPRISE_ID = generateID();
const EMPLOYEE_ID = generateID();

const facility = CreateFacilityMapper.modelToForm(
  FacilityFixture.createPermutation({
    contactPerson: {
      name: 'John Doe',
      phone: '+48 555444333',
      fax: '+48 555444333',
      email: 'johndoe@gmail.com',
    },
  }),
);

export default {
  title: 'modules/facility/AddFacilityForm/Form',
  component: CreateFacilityMultiStepForm,
  decorators: [
    Story => {
      managementMockService.post(`enterprises/${ENTERPRISE_ID}/facilities`, {});

      return <Story />;
    },
  ],
} as ComponentMeta<typeof CreateFacilityMultiStepForm>;

const Template: ComponentStory<typeof CreateFacilityMultiStepForm> = () => {
  return <CreateFacilityMultiStepForm enterpriseId={ENTERPRISE_ID} employeeId={EMPLOYEE_ID} />;
};

export const CreateFacilityForm = Template.bind({});
CreateFacilityForm.play = async ({ canvasElement }) => {
  const baseInfoStepPo = BaseInfoStepPo.render(canvasElement);
  const workingHoursStepPo = WorkingDaysAndAddressStepPo.render(canvasElement);
  const contactStepPo = ContactStepPo.render(canvasElement);
  const summaryStepPo = SummaryStepPo.render(canvasElement);

  await baseInfoStepPo.expectStepTitle();

  await baseInfoStepPo.setName(facility.facilityName);
  await baseInfoStepPo.setSlug(facility.slug);
  await baseInfoStepPo.setDescription(facility.facilityDescription ?? '');
  await baseInfoStepPo.setCurrency('EU');
  await baseInfoStepPo.setMainBusinessCategory('Barber');
  await baseInfoStepPo.setSubordinateBusinessCategory(['Barber', 'Hairdresser']);

  await baseInfoStepPo.goToNextStep();

  await workingHoursStepPo.expectStepTitle();

  await workingHoursStepPo.setWeekDay(0, 'Monday');
  await workingHoursStepPo.setHourUntil(0, '09:00');
  await workingHoursStepPo.setHourTo(0, '16:00');
  await workingHoursStepPo.setPostCode(facility.address.postCode);
  await workingHoursStepPo.setCity(facility.address.city);
  await workingHoursStepPo.setStreet(facility.address.street);

  await workingHoursStepPo.goToNextStep();

  await contactStepPo.expectStepTitle();

  await contactStepPo.setContactPhone(0, '+48 555444333');
  await contactStepPo.setContactType(1, 'Email');
  await contactStepPo.setContactEmail(0, 'test@test.com');
  await contactStepPo.setContactPersonName(facility.contactPerson?.name ?? '');
  await contactStepPo.setContactPersonPhoneNumber(facility.contactPerson?.phone ?? '');
  await contactStepPo.setContactPersonFaxNumber(facility.contactPerson?.fax ?? '');
  await contactStepPo.setContactPersonEmail(facility.contactPerson?.email ?? '');

  await contactStepPo.goToNextStep();

  await summaryStepPo.expectStepTitle();

  await summaryStepPo.submitForm();
  await summaryStepPo.expectFacilityNotificationAppeared();
};
