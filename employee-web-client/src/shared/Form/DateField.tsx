import React from 'react';
import { Interpolation, Text } from '@chakra-ui/react';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { DateInput, DateInputProps } from '../Inputs/DateInput';
import { FormattedDate } from '../Date';

type IProps = Omit<DateInputProps, 'onChange'> & FieldPrototypeProps;

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
      readModeComponent={({ value }) => {
        if (!value) {
          return <Text>---</Text>;
        }

        return <FormattedDate value={value} />;
      }}
    >
      {(_, fieldProps, { isInvalid }) => {
        return <DateInput isInvalid={isInvalid} {...props} {...fieldProps} />;
      }}
    </FieldPrototype>
  );
};

export { DateField };
