import React from 'react';
import { Interpolation } from '@chakra-ui/react';
import { ValueType } from 'react-select';

import { OptionType } from 'types';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { Select, SelectProps } from '../Select';

export type SelectFieldProps = SelectProps & FieldPrototypeProps;

const SelectField = ({ name, label, required, disabled, helperText, id, tip, css, onFocus, ...selectProps }: SelectFieldProps) => {
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
      {({ formState: { isSubmitting }, setValue }, fieldProps) => (
        <Select
          isDisabled={isSubmitting}
          {...fieldProps}
          {...selectProps}
          onFocus={onFocus as () => void}
          onChange={(option: ValueType<OptionType, boolean> | null | undefined) => {
            if (!option) {
              setValue(name, null, { shouldDirty: true });
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
