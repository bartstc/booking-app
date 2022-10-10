import React from 'react';
import { useController } from 'react-hook-form';
import { kebabCase } from "lodash";
import { Switch as CSwitch, SwitchProps } from '@chakra-ui/react';

import { useFormContextSelector } from '../FormProvider';
import { IBasicFieldProps } from './IBasicFieldProps';
import { useErrorMessage } from './useErrorMessage';

interface IProps<Value = string> extends IBasicFieldProps, Omit<SwitchProps, 'name' | 'onChange' | 'isChecked'> {
  onChange?(setValue: (set: (value: Value) => Value) => void, event: React.ChangeEvent<HTMLInputElement>): void;

  isChecked?(value: Value): boolean;
}

const Switch = ({ register: registerProp, onChange: onChangeProp, isChecked, size, defaultValue, ...props }: IProps) => {
  const control = useFormContextSelector(state => state.control);
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name: props.name,
    control,
    defaultValue,
    rules: {
      required: {
        value: props.isRequired ?? false,
        message: 'Field is required',
      },
      ...registerProp,
    },
  });
  const setValue = useFormContextSelector(state => state.setValue);
  const error = useErrorMessage(props.name);

  return (
    <CSwitch
      isInvalid={!!error}
      ref={ref}
      value={value}
      id={kebabCase(props.name)}
      onChange={event => {
        if (!onChangeProp) {
          return onChange(event);
        }

        onChangeProp(set => {
          const newValue = set(value);
          setValue(props.name, newValue);
        }, event);
      }}
      size={size}
      onBlur={onBlur}
      isChecked={isChecked ? isChecked(value) : typeof value === 'boolean' ? value : undefined}
    />
  );
};

export { Switch };
