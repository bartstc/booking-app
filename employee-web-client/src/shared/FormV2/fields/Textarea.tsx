import React from 'react';
import { Textarea as CTextarea } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { kebabCase } from 'lodash';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField } from '../presentation';
import { ITextProps } from './TextInput';
import { useErrorMessage } from './useErrorMessage';

export interface IProps extends ITextProps {}

const Textarea = ({ register: registerProp, placeholder, defaultValue, ...props }: ITextProps) => {
  const autoValidation = useConfigurationValue('autoValidation');
  const control = useFormContextSelector(state => state.control);
  const error = useErrorMessage(props.name);

  const {
    field: { value, onChange, onBlur },
  } = useController({
    name: props.name,
    control,
    rules: {
      required: {
        value: (autoValidation && props.isRequired) ?? false,
        message: 'Field is required',
      },
      ...registerProp,
    },
  });

  return (
    <FormField {...props} label={props.children ?? props.label} isInvalid={!!error} errorMessage={error}>
      <CTextarea
        value={value}
        id={kebabCase(props.name)}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        fontSize='sm'
        defaultValue={defaultValue ?? undefined}
        _placeholder={{ color: 'gray.500' }}
      />
    </FormField>
  );
};

export { Textarea };
