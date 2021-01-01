import React from 'react';
import { Interpolation, useTheme } from '@chakra-ui/react';
import { ReactDatePickerProps } from 'react-datepicker';

import { FieldPrototype } from './Builders';
import { DatePicker } from '../Date';
import { FieldPrototypeProps } from './Builders/FieldPrototype';

type IProps = Omit<ReactDatePickerProps, 'onChange'> & FieldPrototypeProps;

const DateField = ({ name, label, required, disabled, helperText, id, tip, css, ...props }: IProps) => {
  const { colors } = useTheme();

  return (
    <FieldPrototype
      name={name}
      isRequired={required}
      isDisabled={disabled}
      helperText={helperText}
      tip={tip}
      id={id}
      label={label}
      css={css as Interpolation<Record<string, unknown>>}
    >
      {({ formState: { errors } }, fieldProps) => {
        const isInvalid = Boolean(errors[name]);

        return (
          <DatePicker
            borderColor={isInvalid ? colors.red[500] : colors.gray[200]}
            focusColor={colors.blue[500]}
            isInvalid={isInvalid}
            {...props}
            {...fieldProps}
          />
        );
      }}
    </FieldPrototype>
  );
};

export { DateField };
