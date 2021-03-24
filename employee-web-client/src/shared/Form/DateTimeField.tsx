import React from 'react';
import { Text } from '@chakra-ui/react';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { DateTimeInput, DateTimeInputProps } from '../Inputs/DateTimeInput';
import { FormattedDate } from '../Date';

export type DateTimeFieldProps = Omit<DateTimeInputProps, 'onChange'> & FieldPrototypeProps;

const DateTimeField = ({
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
}: DateTimeFieldProps) => {
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
      {({ setValue, clearErrors }, fieldProps, { isInvalid }) => {
        return (
          <DateTimeInput
            {...props}
            {...fieldProps}
            isInvalid={isInvalid}
            onChange={dateTimeValue => {
              setValue(name, dateTimeValue, { shouldDirty: true });
              if (dateTimeValue) clearErrors(name);
            }}
          />
        );
      }}
    </FieldPrototype>
  );
};

export { DateTimeField };
