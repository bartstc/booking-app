import * as yup from 'yup';

import { contactsSchema } from 'shared/domain/schemas';
import { AddEmployeeDto } from 'modules/facilities/application/command/addEmployee';

export const addEmployeeSchema = yup.object().shape<AddEmployeeDto>({
  employeeName: yup.string().required().min(1).max(999),
  birthDate: yup.date().required(),
  employmentDate: yup.date().required(),
  position: yup.string().required().min(1).max(999),
  contacts: contactsSchema,
});
