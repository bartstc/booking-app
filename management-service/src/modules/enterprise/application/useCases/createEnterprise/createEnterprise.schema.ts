import * as yup from 'yup';
import { TextValidator } from 'shared/core';

import { CreateEnterpriseDto } from './createEnterprise.dto';
import { countryCodes } from '../../../domain';
import { IContactPerson } from '../../../domain/types';

export const createEnterpriseSchema = yup.object().shape<CreateEnterpriseDto>({
  enterpriseName: yup
    .string()
    .required()
    .min(1)
    .max(999),
  enterpriseDescription: yup
    .string()
    .required()
    .min(1)
    .max(9999),
  enterpriseUrl: yup
    .string()
    .required()
    .test('validUrlTest', 'Invalid url format', url => {
      return TextValidator.validateWebURL(url);
    }),
  countryCode: yup
    .string()
    .required()
    .oneOf(countryCodes.map(countryCode => countryCode.code)),
  contactPerson: yup.object().shape<IContactPerson>({
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
  }),
});
