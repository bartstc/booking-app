import React from 'react';
import { Text } from '@chakra-ui/react';
import { ValueType } from 'react-select';

import { OptionType } from 'types';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { useRequiredFieldMessage } from '../../utils/messages';
import { SelectInput, SelectInputProps, findOption, findOptions, getReadValue, getValue } from '../Inputs/SelectInput';

export type SelectFieldProps = Omit<SelectInputProps, 'isDisabled'> &
  FieldPrototypeProps & {
    onChangeEffect?: (option: ValueType<OptionType, boolean> | null | undefined) => void;
  };

const SelectField = ({
  name,
  label,
  required = true,
  disabled,
  helperText,
  id,
  tip,
  isMulti = false,
  options,
  onChangeEffect,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
  ...selectProps
}: SelectFieldProps) => {
  const requiredMsg = useRequiredFieldMessage();

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

        if (Array.isArray(value) && !value.length) {
          return <Text>---</Text>;
        }

        return <Text>{getReadValue(value, options, isMulti!)}</Text>;
      }}
      rowSpan={rowSpan}
      rowStart={rowStart}
      rowEnd={rowEnd}
      colSpan={colSpan}
      colStart={colStart}
      colEnd={colEnd}
    >
      {({ formState: { isSubmitting }, setValue, clearErrors, setError }, { value, ...fieldProps }, { isInvalid }) => (
        <SelectInput
          isDisabled={isSubmitting || disabled}
          {...fieldProps}
          {...selectProps}
          id={id}
          isMulti={isMulti}
          isInvalid={isInvalid}
          options={options}
          value={isMulti ? findOptions(getValue(value, true), options) : findOption(getValue(value, false), options)}
          onChange={(option: ValueType<OptionType, boolean> | null | undefined) => {
            if (onChangeEffect) {
              onChangeEffect(option);
            }

            if (option) {
              clearErrors(name);
            }

            const onClear = () => {
              if (isMulti && required) {
                setError(name, { message: requiredMsg });
              }
              setValue(name, null, { shouldDirty: true });
            };

            if (!option) {
              onClear();
              return;
            }

            if (Array.isArray(option) && option.length === 0) {
              onClear();
              return;
            }

            if (Array.isArray(option)) {
              setValue(
                name,
                option.map(opt => opt.value),
                { shouldDirty: true },
              );
              return;
            }

            setValue(name, (option as OptionType).value, {
              shouldDirty: true,
            });
          }}
        />
      )}
    </FieldPrototype>
  );
};

export { SelectField };
