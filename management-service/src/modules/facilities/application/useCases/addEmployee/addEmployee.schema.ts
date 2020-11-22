import * as yup from 'yup';

import { contactsSchema } from 'shared/domain/schemas';

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
    .min(1)
    .max(999),
  contacts: contactsSchema,
});
