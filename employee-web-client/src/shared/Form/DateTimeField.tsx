import React from 'react';
import { Text } from '@chakra-ui/react';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { DateTimeInput, DateTimeInputProps } from '../Inputs/DateTimeInput';
import { FormattedDate } from '../Date';

type IProps = Omit<DateTimeInputProps, 'onChange'> & FieldPrototypeProps;

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
}: IProps) => {
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
      {({ setValue }, fieldProps, { isInvalid }) => {
        return (
          <DateTimeInput
            isInvalid={isInvalid}
            {...props}
            {...fieldProps}
            onChange={dateTimeValue => {
              setValue(name, dateTimeValue, { shouldDirty: true });
            }}
          />
        );
      }}
    </FieldPrototype>
  );
};

export { DateTimeField };
