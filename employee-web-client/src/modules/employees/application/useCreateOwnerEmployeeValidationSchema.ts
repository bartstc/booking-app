import * as yup from 'yup';
import { useIntl } from 'react-intl';

import { useRequiredFieldMessage } from 'utils/messages';
import { TextValidator, useContactsValidationSchema } from 'utils/validation';

import { ICreateOwnerEmployeeDto } from './types';

export const useCreateOwnerEmployeeValidationSchema = () => {
  const { formatMessage } = useIntl();
  const requiredMessage = useRequiredFieldMessage();
  const contactsValidationSchema = useContactsValidationSchema();

  return yup.object().shape<ICreateOwnerEmployeeDto>({
    employeeName: yup.string().required(requiredMessage).min(1).max(999),
    birthDate: yup.string().required(requiredMessage).nullable(true) as yup.Schema<string>,
    employmentDate: yup.string().required(requiredMessage).nullable(true) as yup.Schema<string>,
    position: yup.string().required(requiredMessage).min(1).max(999),
    contacts: contactsValidationSchema,
    employeeEmail: yup
      .string()
      .required(requiredMessage)
      .test('valid email format', formatMessage({ id: 'invalid-format', defaultMessage: 'Invalid format' }), email => {
        if (!email) return false;
        return TextValidator.validateEmailAddress(email);
      }),
  });
};
