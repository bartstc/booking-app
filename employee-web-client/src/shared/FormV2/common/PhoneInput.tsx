import React from 'react';
import { useIntl } from "react-intl";

import { ITextProps, TextInput } from "../fields";

interface IProps extends ITextProps {}

const PhoneInput = (props: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      {...props}
      register={{
        pattern: {
          /* eslint-disable no-useless-escape */
          value:
            /^(\+\d{1,3}(\s){0,1}\d+(\-\d+)*((\s)\/(\s)?(\+\d{1,3}\s)?\d+(\-\d+)*)*)$/,
          message: formatMessage({
            id: "phone-input-error-pattern-message",
            defaultMessage: "Invalid format",
          }),
        },
        maxLength: {
          value: 40,
          message: formatMessage({
            id: "phone-input-error-max-message",
            defaultMessage: "Max 40 characters",
          }),
        },
        ...props.register,
      }}
    >
      {!props.children
        ? formatMessage({
            id: "phone-input-label",
            defaultMessage: "Phone",
          })
        : props.children}
    </TextInput>
  );
};

export { PhoneInput };
