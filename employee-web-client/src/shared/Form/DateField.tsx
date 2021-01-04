import React from 'react';
import { Interpolation } from '@chakra-ui/react';
import { ReactDatePickerProps } from 'react-datepicker';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { DatePicker } from '../Date';

type IProps = Omit<ReactDatePickerProps, 'onChange'> & FieldPrototypeProps;

const DateField = ({ name, label, required, disabled, helperText, id, tip, css, ...props }: IProps) => {
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
      {(_, fieldProps, isInvalid) => {
        return <DatePicker isInvalid={isInvalid} {...props} {...fieldProps} />;
      }}
    </FieldPrototype>
  );
};

export { DateField };
