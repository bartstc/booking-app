import React from 'react';
import { useIntl } from 'react-intl';

import { TextValidator } from 'utils/validation';

import { ITextProps, TextInput } from '../fields';

interface IProps extends ITextProps {}

const UrlInput = (props: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      {...props}
      placeholder={formatMessage({
        id: 'url-input-placeholder',
        defaultMessage: 'Enter URL address',
      })}
      register={{
        pattern: {
          /* eslint-disable no-useless-escape */
          value: TextValidator.urlRegex,
          message: formatMessage({
            id: 'url-input-error-pattern-message',
            defaultMessage: 'Invalid format',
          }),
        },
        maxLength: {
          value: 600,
          message: formatMessage({
            id: 'url-input-error-max-message',
            defaultMessage: 'Max 600 characters',
          }),
        },
        ...props.register,
      }}
    >
      {!props.children
        ? formatMessage({
            id: 'url-input-label',
            defaultMessage: 'URL address',
          })
        : props.children}
    </TextInput>
  );
};

export { UrlInput };
