import { UseFormMethods } from 'react-hook-form';
import React, { ReactNode } from 'react';

import { ContactType, Currency } from 'types';
import { Form } from 'shared/Form';

import { useValidationSchema } from './useValidationSchema';
import { BusinessCategoryType, WeekDay } from '../../../types';
import { ICreateFacilityFormDto } from '../../../adapter/createFacility';

const createDefaultValues: ICreateFacilityFormDto = {
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
  onSubmit: (model: ICreateFacilityFormDto, methods: UseFormMethods<ICreateFacilityFormDto>) => void;
  children: ReactNode;
  defaultValues?: ICreateFacilityFormDto;
}

const CreateFacilityForm = ({ onSubmit, children, defaultValues = createDefaultValues }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<ICreateFacilityFormDto>
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

export { CreateFacilityForm };
