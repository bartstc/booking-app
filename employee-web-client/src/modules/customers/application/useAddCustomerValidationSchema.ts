import * as yup from 'yup';

import { useRequiredFieldMessage } from 'utils/messages';
import { useContactsValidationSchema } from 'utils/validation';

import { IAddCustomerDto, IAddress } from './types';

export const useAddCustomerValidationSchema = () => {
  const requiredMessage = useRequiredFieldMessage();
  const contactsValidationSchema = useContactsValidationSchema();

  return yup.object().shape<IAddCustomerDto>({
    fullName: yup.string().required(requiredMessage).min(1).max(999),
    birthDate: yup.string().required(requiredMessage).nullable(true) as yup.Schema<string>,
    description: yup.string().max(9999),
    contacts: contactsValidationSchema,
    address: yup.object().shape<IAddress>({
      street: yup.string().max(300).trim().required(requiredMessage),
      city: yup.string().max(100).trim().required(requiredMessage),
      postCode: yup.string().max(60).trim().required(requiredMessage),
    }) as yup.Schema<IAddress>,
  });
};
