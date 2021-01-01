import React, { ReactNode, ElementType } from 'react';
import { Interpolation, useTheme } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/styled-system';
import { ReactDatePickerProps } from 'react-datepicker';

import { FieldPrototype } from './Builders';
import { DatePicker } from '../Date';

interface IProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label: ReactNode | string;
  id: string;
  as?: ElementType;
  required?: boolean;
  disabled?: boolean;
  tip?: ReactNode | string;
  helperText?: ReactNode;
  css?: SystemStyleObject;
}

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
