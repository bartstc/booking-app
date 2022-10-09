import React from 'react';
import { useIntl } from 'react-intl';

import { TextValidator } from 'utils/validation';

import { ITextProps, MaskedTextInput } from '../fields';
import { masks } from '../../Form';

interface IProps extends ITextProps {}

const PhoneInput = (props: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <MaskedTextInput
      {...props}
      mask={masks.phone}
      register={{
        pattern: {
          /* eslint-disable no-useless-escape */
          value: TextValidator.phoneRegex,
          message: formatMessage({
            id: 'phone-input-error-pattern-message',
            defaultMessage: 'Invalid format',
          }),
        },
        maxLength: {
          value: 40,
          message: formatMessage({
            id: 'phone-input-error-max-message',
            defaultMessage: 'Max 40 characters',
          }),
        },
        ...props.register,
      }}
    >
      {!props.children
        ? formatMessage({
            id: 'phone-input-label',
            defaultMessage: 'Phone',
          })
        : props.children}
    </MaskedTextInput>
  );
};

export { PhoneInput };
