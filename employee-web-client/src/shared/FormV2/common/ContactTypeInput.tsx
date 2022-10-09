import React from 'react';
import { useIntl } from 'react-intl';

import { ISelectProps, Select } from '../fields';
import { ContactType } from 'types';

interface IProps extends Omit<ISelectProps<ContactType>, 'options' | 'label' | 'children'> {}

const ContactTypeInput = (props: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <Select
      options={[
        {
          value: ContactType.Email,
          label: formatMessage({ id: 'email', defaultMessage: 'Email' }),
        },
        {
          value: ContactType.Fax,
          label: formatMessage({ id: 'fax', defaultMessage: 'Fax' }),
        },
        {
          value: ContactType.Phone,
          label: formatMessage({ id: 'phone', defaultMessage: 'Phone' }),
        },
        {
          value: ContactType.Url,
          label: formatMessage({ id: 'url', defaultMessage: 'Url' }),
        },
      ]}
      {...props}
    >
      {formatMessage({ id: 'contact-type', defaultMessage: 'Type' })}
    </Select>
  );
};

export { ContactTypeInput };
