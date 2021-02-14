import * as yup from 'yup';

import { useInvalidFormatFieldMessage, useRequiredFieldMessage } from '../messages';
import { IContactPerson } from '../../types';
import { TextValidator } from './TextValidator';

export const useContactPersonValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  const invalidFormatMessage = useInvalidFormatFieldMessage();

  return yup.object().shape<IContactPerson>({
    name: yup.string().required(requiredMessage).min(1).max(999),
    phone: yup
      .string()
      .required(requiredMessage)
      .test('validPhoneTest', invalidFormatMessage, phone => {
        return TextValidator.validatePhoneNumber(phone!);
      }),
    fax: yup.string().test('validFaxTest', invalidFormatMessage, fax => {
      return TextValidator.validatePhoneNumber(fax!);
    }),
    email: yup
      .string()
      .required(requiredMessage)
      .test('validEmailTest', invalidFormatMessage, email => {
        return TextValidator.validateEmailAddress(email!);
      }),
  });
};
