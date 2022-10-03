import React, { Input } from '@chakra-ui/react';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField, IFormFieldProps } from '../presentation';
import { IBasicFieldProps } from './IBasicFieldProps';
import { useErrorMessage } from './useErrorMessage';

export interface ITextProps extends IBasicFieldProps, IFormFieldProps {
  placeholder?: string;
  isDisabled?: boolean;
  type?: string;
  autofocus?: boolean;
}

const TextInput = ({ register: registerProp, placeholder, defaultValue, isDisabled, type, autofocus, ...props }: ITextProps) => {
  const register = useFormContextSelector(state => state.register);
  const error = useErrorMessage(props.name);
  const size = useConfigurationValue('size');
  const variant = useConfigurationValue('variant');
  const autoValidation = useConfigurationValue('autoValidation');

  return (
    <FormField {...props} size={size} label={props.children ?? props.label} isInvalid={!!error} errorMessage={error}>
      <Input
        {...register(props.name, {
          required: {
            value: (autoValidation && props.isRequired) ?? false,
            message: 'Field is required',
          },
          ...registerProp,
        })}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
        size={size}
        variant={variant}
        fontSize='sm'
        isDisabled={isDisabled}
        autoFocus={autofocus}
        _placeholder={{ color: 'gray.500' }}
      />
    </FormField>
  );
};

export { TextInput };
