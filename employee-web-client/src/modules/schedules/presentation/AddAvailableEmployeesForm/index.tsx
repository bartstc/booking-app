import React from 'react';

import { Form } from 'shared/Form';

import { IAddAvailabilityFormValues } from '../../application/types';
import { useAddAvailableEmployeeValidationSchema } from '../../application';
import { AvailableEmployeesFields } from './AvailableEmployeesFields';

interface IProps {
  onSubmit: (model: { availabilities: IAddAvailabilityFormValues[] }) => void;
  date: string;
  defaultValues?: IAddAvailabilityFormValues[];
}

const AddAvailableEmployeesForm = ({ onSubmit, date, defaultValues }: IProps) => {
  const schema = useAddAvailableEmployeeValidationSchema();

  return (
    <Form<{ availabilities: IAddAvailabilityFormValues[] }>
      onSubmit={onSubmit}
      schema={schema}
      id='add-available-employees-form'
      defaultValues={{ availabilities: defaultValues }}
    >
      <AvailableEmployeesFields date={date} />
    </Form>
  );
};

export { AddAvailableEmployeesForm };
