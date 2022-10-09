import React from 'react';
import { useIntl } from 'react-intl';

import { ITextProps, MaskedTextInput } from '../fields';
import { masks } from '../../Form';

interface IProps extends ITextProps {}

const PostCodeInput = ({ children, ...props }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <MaskedTextInput
      {...props}
      mask={masks.postCode}
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
    </MaskedTextInput>
  );
};

export { PostCodeInput };
