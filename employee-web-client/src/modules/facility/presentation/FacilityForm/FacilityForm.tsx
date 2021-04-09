import { UseFormMethods } from 'react-hook-form';
import React, { ReactNode } from 'react';

import { ContactType, Currency } from 'types';
import { Form } from 'shared/Form';

import { BusinessCategoryType, CreateFacilityFormDto, WeekDay } from '../../application/types';
import { useCreateFacilityValidationSchema } from '../../application';

const createDefaultValues: CreateFacilityFormDto = {
  facilityName: '',
  facilityDescription: '',
  slug: '',
  currency: '' as Currency,
  mainBusinessCategory: '' as BusinessCategoryType,
  subordinateBusinessCategories: [],
  contacts: [{ type: ContactType.Phone, value: '' }],
  contactPerson: {
    email: '',
    fax: '',
    phone: '',
    name: '',
  },
  address: {
    postCode: '',
    province: '',
    city: '',
    street: '',
  },
  availability: [
    {
      dayName: WeekDay.Monday,
      hours: {
        until: '',
        to: '',
      },
    },
  ],
};

interface IProps {
  onSubmit: (model: CreateFacilityFormDto, methods: UseFormMethods<CreateFacilityFormDto>) => void;
  children: ReactNode;
  defaultValues?: CreateFacilityFormDto;
}

const FacilityForm = ({ onSubmit, children, defaultValues = createDefaultValues }: IProps) => {
  const schema = useCreateFacilityValidationSchema();

  return (
    <Form<CreateFacilityFormDto>
      onSubmit={onSubmit}
      resetOnSubmit={false}
      id='create-facility'
      schema={schema}
      defaultValues={defaultValues}
    >
      {children}
    </Form>
  );
};

export { FacilityForm };
