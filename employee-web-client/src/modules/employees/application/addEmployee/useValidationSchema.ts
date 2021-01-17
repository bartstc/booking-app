import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { useContactsValidationSchema } from 'utils/validation';

import { IAddEmployeeDto } from './AddEmployeeForm';

export const useValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  const contactsValidationSchema = useContactsValidationSchema();

  return yup.object().shape<IAddEmployeeDto>({
    employeeName: yup.string().required(requiredMessage).min(1).max(999),
    birthDate: yup.string().required(requiredMessage),
    employmentDate: yup.string().required(requiredMessage),
    position: yup.string().required(requiredMessage).min(1).max(999),
    contacts: contactsValidationSchema,
  });
};
