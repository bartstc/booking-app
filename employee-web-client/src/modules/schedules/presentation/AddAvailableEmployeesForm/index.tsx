import React from 'react';

import { Form } from 'shared/Form';

import { IAddAvailableEmployeeDto } from '../../application/types';
import { useAddAvailableEmployeeValidationSchema } from '../../application';
import { AvailableEmployeesFields } from './AvailableEmployeesFields';

interface IProps {
  onSubmit: (model: { availabilities: IAddAvailableEmployeeDto[] }) => void;
  employeeId: string;
  creatorId: string;
  date: string;
  defaultValues?: IAddAvailableEmployeeDto[];
}

const AddAvailableEmployeesForm = ({ employeeId, creatorId, onSubmit, date, defaultValues }: IProps) => {
  const schema = useAddAvailableEmployeeValidationSchema();

  return (
    <Form<{ availabilities: IAddAvailableEmployeeDto[] }>
      onSubmit={onSubmit}
      schema={schema}
      id='add-available-employees-form'
      defaultValues={{ availabilities: defaultValues }}
    >
      <AvailableEmployeesFields date={date} creatorId={creatorId} employeeId={employeeId} />
    </Form>
  );
};

export { AddAvailableEmployeesForm };
