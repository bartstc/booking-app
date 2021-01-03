import React from 'react';
import { Interpolation } from '@chakra-ui/react';
import { ValueType } from 'react-select';

import { OptionType } from 'types';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { Select, SelectProps } from '../Select';
import { useRequiredFieldMessage } from '../../messages';

type Options = OptionType[];

export type SelectFieldProps = SelectProps & FieldPrototypeProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValue = (value: unknown, isMulti: boolean): any => {
  if (value === null || value === undefined) {
    if (isMulti) {
      return [];
    }

    return null;
  }

  return value;
};

const findOptions = (selectedValues: Array<unknown>, options: Options): Options => {
  if (options.length === 0) {
    return [];
  }

  if (selectedValues.length === 0) {
    return [];
  }

  return selectedValues.map(selectedValue => {
    const result = options.find(option => option.value === selectedValue)!;

    if (result === undefined) {
      return { label: selectedValue as string, value: selectedValue };
    }

    return result;
  });
};

const findOption = (selectedValue: unknown, options: Options): OptionType | null => {
  if (selectedValue === null) {
    return null;
  }

  if (typeof selectedValue === 'object') {
    throw new Error(`FormSelect: incorrect value type`);
  }

  return (
    options.find(option => {
      if (typeof option.value === 'object') {
        throw new Error(`FormSelect: incorrect value type`);
      }
      return option.value === selectedValue;
    }) || { label: selectedValue as string, value: selectedValue }
  );
};

const SelectField = ({
  name,
  label,
  required = true,
  disabled,
  helperText,
  id,
  tip,
  css,
  isMulti = false,
  options,
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
      css={css as Interpolation<Record<string, unknown>>}
    >
      {({ formState: { isSubmitting, errors }, setValue, clearErrors, setError }, { value, ...fieldProps }) => (
        <Select
          isDisabled={isSubmitting}
          {...fieldProps}
          {...selectProps}
          isMulti={isMulti}
          isInvalid={Boolean(errors[name])}
          options={options}
          value={isMulti ? findOptions(getValue(value, true), options) : findOption(getValue(value, false), options)}
          onChange={(option: ValueType<OptionType, boolean> | null | undefined) => {
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
