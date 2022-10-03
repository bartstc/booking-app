import React from 'react';
import { Textarea as CTextarea } from '@chakra-ui/react';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField } from '../presentation';
import { ITextProps } from './TextInput';
import { useErrorMessage } from './useErrorMessage';

export interface IProps extends ITextProps {}

const Textarea = ({ register: registerProp, placeholder, defaultValue, ...props }: ITextProps) => {
  const autoValidation = useConfigurationValue('autoValidation');
  const register = useFormContextSelector(state => state.register);
  const error = useErrorMessage(props.name);

  return (
    <FormField {...props} label={props.children ?? props.label} isInvalid={!!error} errorMessage={error}>
      <CTextarea
        {...register(props.name, {
          required: {
            value: (autoValidation && props.isRequired) ?? false,
            message: 'Field is required',
          },
          ...registerProp,
        })}
        placeholder={placeholder}
        fontSize='sm'
        defaultValue={defaultValue ?? undefined}
        _placeholder={{ color: 'gray.500' }}
      />
    </FormField>
  );
};

export { Textarea };
