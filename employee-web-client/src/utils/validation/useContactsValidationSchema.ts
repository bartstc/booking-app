import * as yup from 'yup';

import { ContactType, IContact } from 'types';

import { TextValidator } from './TextValidator';
import { useInvalidFormatFieldMessage, useRequiredFieldMessage } from '../messages';

export const useContactsValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  const invalidFormatMessage = useInvalidFormatFieldMessage();

  return yup.array().of(
    yup.object().shape<IContact>({
      type: yup.string().required(requiredMessage).nullable(true) as yup.Schema<ContactType>,
      value: yup
        .string()
        .required(requiredMessage)
        .test('contact format', invalidFormatMessage, function (value) {
          switch (this.parent.type) {
            case ContactType.Email:
              return TextValidator.validateEmailAddress(value!);
            case ContactType.Fax:
            case ContactType.Phone:
              return TextValidator.validatePhoneNumber(value!);
            case ContactType.Url:
              return TextValidator.validateWebURL(value!);
            default:
              return false;
          }
        }),
    }),
  ) as yup.Schema<IContact[]>;
};
