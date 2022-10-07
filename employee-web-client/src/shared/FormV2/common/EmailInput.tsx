import React from 'react';
import { useIntl } from 'react-intl';

import { ITextProps, TextInput } from '../fields';

interface IProps extends ITextProps {}

const EmailInput = (props: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      {...props}
      register={{
        pattern: {
          value: /[^@]+@[^.]+\..+/,
          message: formatMessage({
            id: 'email-input-error-pattern-message',
            defaultMessage: 'Invalid format',
          }),
        },
        maxLength: {
          value: 255,
          message: formatMessage({
            id: 'email-input-error-max-message',
            defaultMessage: 'Max 255 characters',
          }),
        },
        ...props.register,
      }}
    >
      {!props.children
        ? formatMessage({
            id: 'email-input-label',
            defaultMessage: 'Email',
          })
        : props.children}
    </TextInput>
  );
};

export { EmailInput };
