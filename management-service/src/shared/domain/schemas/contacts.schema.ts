import * as yup from 'yup';

import { ContactType, IContact } from '../types';

export const contactsSchema = yup.array().of(
  yup.object().shape<IContact>({
    type: yup
      .string()
      .required()
      .oneOf(Object.values(ContactType)) as yup.Schema<ContactType>,
    value: yup
      .string()
      .trim()
      .required(),
  }),
);
