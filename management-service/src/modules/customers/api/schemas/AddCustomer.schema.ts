import * as yup from 'yup';

import { contactsSchema } from 'shared/domain/schemas';

import { AddCustomerDto } from 'modules/customers/application/command/addCustomer';
import { IAddress } from 'modules/customers/domain/types';

export const addCustomerSchema = yup.object().shape<AddCustomerDto>({
  fullName: yup.string().required().min(1).max(999),
  description: yup.string().max(9999),
  birthDate: yup.date().required(),
  address: yup.object().shape<IAddress>({
    street: yup.string().max(300).trim().required(),
    city: yup.string().max(100).trim().required(),
    postCode: yup.string().max(60).trim().required(),
  }),
  contacts: contactsSchema.min(1),
});
