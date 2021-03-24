import React from 'react';
import { Text } from '@chakra-ui/react';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { DateInput, DateInputProps } from '../Inputs/DateInput';
import { FormattedDate } from '../Date';

export type DateFieldProps = Omit<DateInputProps, 'onChange'> & FieldPrototypeProps;

const DateField = ({
  name,
  label,
  required,
  disabled,
  helperText,
  id,
  tip,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
  ...props
}: DateFieldProps) => {
  return (
    <FieldPrototype
      name={name}
      isRequired={required}
      isDisabled={disabled}
      helperText={helperText}
      tip={tip}
      id={id}
      label={label}
      readModeComponent={({ value }) => {
        if (!value) {
          return <Text>---</Text>;
        }

        return <FormattedDate value={value} />;
      }}
      rowSpan={rowSpan}
      rowStart={rowStart}
      rowEnd={rowEnd}
      colSpan={colSpan}
      colStart={colStart}
      colEnd={colEnd}
    >
      {(_, fieldProps, { isInvalid }) => {
        return <DateInput isInvalid={isInvalid} {...props} {...fieldProps} />;
      }}
    </FieldPrototype>
  );
};

export { DateField };
