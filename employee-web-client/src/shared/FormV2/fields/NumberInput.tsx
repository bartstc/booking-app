import React from 'react';
import { useController } from 'react-hook-form';
import { NumberFormatValues } from 'react-number-format';

import currencyJS from 'currency.js';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField, IFormFieldProps } from '../presentation';
import { NumberInput as NumberInputPresentation } from '../presentation/NumberInput';
import { IBasicFieldProps } from './IBasicFieldProps';
import { useErrorMessage } from './useErrorMessage';

export interface INumberProps extends IBasicFieldProps, IFormFieldProps {
  isDisabled?: boolean;
  decimalScale?: number;
  placeholder?: string;
  thousandSeparator?: string;
}

const NumberInput = ({ register, defaultValue, isDisabled, decimalScale, placeholder, thousandSeparator, ...props }: INumberProps) => {
  const control = useFormContextSelector(state => state.control);
  const autoValidation = useConfigurationValue('autoValidation');
  const error = useErrorMessage(props.name);
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name: props.name,
    control,
    defaultValue,
    rules: {
      required: {
        value: (autoValidation && props.isRequired) ?? false,
        message: 'Field is required',
      },
      ...register,
    },
  });

  return (
    <FormField label={props.children ?? props.label} isInvalid={!!error} errorMessage={error} {...props}>
      <NumberInputPresentation
        value={value ? currencyJS(value, { precision: 10 }).value : ''}
        onValueChange={({ floatValue, value }: NumberFormatValues) => {
          if (floatValue === undefined) {
            return onChange(null);
          }
          onChange(value);
        }}
        onBlur={onBlur}
        getInputRef={ref}
        disabled={isDisabled}
        decimalScale={decimalScale}
        placeholder={placeholder}
        thousandSeparator={thousandSeparator}
      />
    </FormField>
  );
};

export { NumberInput };
