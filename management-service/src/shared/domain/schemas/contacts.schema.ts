import * as yup from 'yup';

import { ContactType, IContact } from '../types';
import { TextValidator } from '../../core';

export const contactsSchema = yup.array().of(
  yup.object().shape<IContact>({
    type: yup
      .string()
      .required()
      .oneOf(Object.values(ContactType)) as yup.Schema<ContactType>,
    value: yup
      .string()
      .required()
      .test('contact format', 'invalidFormat', function(value) {
        switch (this.parent.type) {
          case ContactType.Email:
          case ContactType.Fax:
            return TextValidator.validateEmailAddress(value);
          case ContactType.Phone:
            return TextValidator.validatePhoneNumber(value);
          case ContactType.Url:
            return TextValidator.validateWebURL(value);
          default:
            return false;
        }
      }),
  }),
);
