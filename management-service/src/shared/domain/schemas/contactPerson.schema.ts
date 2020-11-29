import * as yup from 'yup';

import { IContactPerson } from '../types';
import { TextValidator } from '../../core';

export const contactPersonSchema = yup.object().shape<IContactPerson>({
  name: yup
    .string()
    .required()
    .min(1)
    .max(999),
  phone: yup
    .string()
    .required()
    .test('validPhoneTest', 'Invalid phone format', phone => {
      return TextValidator.validatePhoneNumber(phone);
    }),
  fax: yup
    .string()
    .required()
    .test('validFaxTest', 'Invalid fax format', fax => {
      return TextValidator.validatePhoneNumber(fax);
    }),
  email: yup
    .string()
    .required()
    .test('validEmailTest', 'Invalid email format', email => {
      return TextValidator.validateEmailAddress(email);
    }),
});
