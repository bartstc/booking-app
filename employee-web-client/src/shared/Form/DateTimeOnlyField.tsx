import React from 'react';
import { Text } from '@chakra-ui/react';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { DateTimeOnlyInput, DateTimeOnlyInputProps } from '../Inputs/DateTimeOnlyInput';
import { FormattedDate } from '../Date';

export type DateTimeOnlyFieldProps = Omit<DateTimeOnlyInputProps, 'onChange'> &
  FieldPrototypeProps & {
    requiredFieldMessage?: string;
  };

const DateTimeOnlyField = ({
  name,
  label,
  required = true,
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
  requiredFieldMessage = 'Field is required',
  ...props
}: DateTimeOnlyFieldProps) => {
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
      {({ setValue, clearErrors, setError }, fieldProps, { isInvalid }) => {
        return (
          <DateTimeOnlyInput
            {...props}
            {...fieldProps}
            id={id}
            isInvalid={isInvalid}
            onChange={dateTimeValue => {
              setValue(name, dateTimeValue, { shouldDirty: true });
              if (required && dateTimeValue === null) {
                setError(name, { message: requiredFieldMessage });
                return;
              }

              if (dateTimeValue) clearErrors(name);
            }}
          />
        );
      }}
    </FieldPrototype>
  );
};

export { DateTimeOnlyField };
