import * as yup from 'yup';

import { TextValidator } from 'shared/core';
import { contactsSchema } from 'shared/domain/schemas';

import { CreateOwnerEmployeeDto } from '../../application/command/createOwnerEmployee';

export const createOwnerEmployeeSchema = yup.object().shape<CreateOwnerEmployeeDto>({
  employeeEmail: yup
    .string()
    .required()
    .min(1)
    .max(999)
    .test('email format', 'invalidFormat', function (value) {
      return TextValidator.validateEmailAddress(value);
    }),
  employeeName: yup.string().required().min(1).max(999),
  birthDate: yup.date().required(),
  employmentDate: yup.date().required(),
  position: yup.string().required().min(1).max(999),
  contacts: contactsSchema,
  facilityIds: yup.array().of(yup.string()).nullable(true),
});
