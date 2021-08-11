import React from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { SelectField, SelectFieldProps } from 'react-hook-form-chakra-fields';

import { ContactType } from 'types';

type IProps = Omit<SelectFieldProps, 'options'>;

const ContactSelectField = ({ label = <FormattedMessage id='select-contact' defaultMessage='Contact type' />, ...props }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <SelectField
      options={[
        {
          value: ContactType.Email,
          label: formatMessage(messages.email),
        },
        {
          value: ContactType.Fax,
          label: formatMessage(messages.fax),
        },
        {
          value: ContactType.Phone,
          label: formatMessage(messages.phone),
        },
        {
          value: ContactType.Url,
          label: formatMessage(messages.url),
        },
      ]}
      label={label}
      {...props}
    />
  );
};

const messages = defineMessages({
  email: {
    id: 'email',
    defaultMessage: 'Email',
  },
  fax: {
    id: 'fax',
    defaultMessage: 'Fax',
  },
  phone: {
    id: 'phone',
    defaultMessage: 'Phone',
  },
  url: {
    id: 'url',
    defaultMessage: 'Url',
  },
});

export { ContactSelectField };
