import React from 'react';
import { useIntl } from 'react-intl';

import { ITextProps, TextInput } from '../fields';

interface IProps extends ITextProps {}

const PostCode = ({ children, ...props }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      {...props}
      register={{
        pattern: {
          value: /^\d{2}-\d{3}$/,
          message: formatMessage({
            id: 'useYupPostCode.message',
            defaultMessage: 'Invalid format',
          }),
        },
        ...props.register,
      }}
    >
      {!children
        ? formatMessage({
            id: 'EmployerInputs.postCode',
            defaultMessage: 'Post code',
          })
        : children}
    </TextInput>
  );
};

export { PostCode };
