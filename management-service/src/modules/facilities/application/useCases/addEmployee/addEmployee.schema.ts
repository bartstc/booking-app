import * as yup from 'yup';

import { TextValidator } from 'shared/core';
import { contactsSchema } from 'shared/domain/schemas';

import { EmployeePosition } from '../../../domain/types';
import { AddEmployeeDto } from './addEmployee.dto';

export const addEmployeeSchema = yup.object().shape<AddEmployeeDto>({
  employeeName: yup
    .string()
    .required()
    .min(1)
    .max(999),
  position: yup
    .string()
    .required()
    .oneOf(Object.values(EmployeePosition)),
  employmentDate: yup
    .string()
    .required()
    .test('validDate', 'Invalid date format', date => {
      return TextValidator.validateDate(date);
    }),
  contacts: contactsSchema,
});
