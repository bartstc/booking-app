import { ContactType } from 'types';

export const contactTypeMessages = {
  [ContactType.Phone]: {
    id: 'phone-contact-type',
    defaultMessage: 'Phone',
  },
  [ContactType.Fax]: {
    id: 'fax-contact-type',
    defaultMessage: 'Fax',
  },
  [ContactType.Url]: {
    id: 'url-contact-type',
    defaultMessage: 'Address url',
  },
  [ContactType.Email]: {
    id: 'email-contact-type',
    defaultMessage: 'Email',
  },
};
