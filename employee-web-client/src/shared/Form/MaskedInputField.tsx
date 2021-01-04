import React from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { useFormContext } from 'react-hook-form';

import { InputField, InputFieldProps } from './InputField';

type MaskedInputFieldProps = InputFieldProps & MaskedInputProps;

const MaskedInputField = ({ name, ...props }: MaskedInputFieldProps) => {
  const { watch } = useFormContext();

  return <InputField as={MaskedInput} name={name} value={watch(name)} {...props} />;
};

export { MaskedInputField };
