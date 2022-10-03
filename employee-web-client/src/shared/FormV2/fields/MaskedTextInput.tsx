import React from 'react';
import { useController } from 'react-hook-form';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import { Input } from '@chakra-ui/react';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField } from '../presentation';
import { ITextProps } from './TextInput';
import { useErrorMessage } from './useErrorMessage';

// @ts-ignore
interface IProps extends ITextProps, MaskedInputProps {}

const MaskedTextInput = ({ register: registerProp, placeholder, defaultValue, ...props }: IProps) => {
  const error = useErrorMessage(props.name);
  const size = useConfigurationValue('size');
  const variant = useConfigurationValue('variant');
  const autoValidation = useConfigurationValue('autoValidation');
  const control = useFormContextSelector(state => state.control);
  const {
    field: { onChange, value, onBlur, ref },
  } = useController({
    name: props.name,
    control,
    defaultValue,
    rules: {
      required: {
        value: (autoValidation && props.isRequired) ?? false,
        message: 'Field is required',
      },
      ...registerProp,
    },
  });

  const { mask, guide, placeholderChar, keepCharPositions, pipe, showMask, render, ...formFieldProps } = { ...props };

  return (
    <FormField {...formFieldProps} size={size} label={props.children ?? props.label} isInvalid={!!error} errorMessage={error}>
      <Input
        as={MaskedInput}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        // @ts-ignore
        defaultValue={defaultValue}
        size={size}
        variant={variant}
        fontSize='sm'
        mask={mask}
        guide={guide}
        placeholderChar={placeholderChar}
        keepCharPositions={keepCharPositions}
        pipe={pipe}
        showMask={showMask}
        render={render}
      />
    </FormField>
  );
};

export { MaskedTextInput };
