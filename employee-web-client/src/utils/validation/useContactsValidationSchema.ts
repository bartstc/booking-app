import * as yup from 'yup';
import { useIntl } from 'react-intl';

import { ContactType, IContact } from 'types';

import { TextValidator } from './TextValidator';
import { useRequiredFieldMessage } from '../messages';

export const useContactsValidationSchema = () => {
  const { formatMessage } = useIntl();
  const requiredMessage = useRequiredFieldMessage();

  return yup.array().of(
    yup.object().shape<IContact>({
      type: yup.string().required(requiredMessage).nullable(true) as yup.Schema<ContactType>,
      value: yup
        .string()
        .required(requiredMessage)
        .test('contact format', formatMessage({ id: 'invalid-format', defaultMessage: 'Invalid format' }), function (value) {
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
