import React, { ReactElement, ReactNode } from 'react';
import { useFormContext, UseFormMethods, Controller, ControllerRenderProps } from 'react-hook-form';
import { SystemStyleObject } from '@chakra-ui/styled-system';

import { FieldControl, IFieldControlProps } from './FieldControl';

export interface FieldPrototypeProps {
  name: string;
  label: ReactNode | string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  tip?: ReactNode | string;
  helperText?: ReactNode;
  css?: SystemStyleObject;
}

interface IProps extends Omit<IFieldControlProps, 'children' | 'errorText'> {
  children: (methods: UseFormMethods, controllerProps: ControllerRenderProps) => ReactElement;
}

const FieldPrototype = ({ children, name, isRequired = true, ...props }: IProps) => {
  const methods = useFormContext();
  const isInvalid = Boolean(methods.errors[name]);

  return (
    <FieldControl errorText={methods.errors[name]?.message} isInvalid={isInvalid} name={name} isRequired={isRequired} {...props}>
      <Controller
        name={name}
        render={props => {
          return children(methods, props);
        }}
      />
    </FieldControl>
  );
};

export { FieldPrototype };
