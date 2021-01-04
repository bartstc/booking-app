import React, { ReactElement, ReactNode } from 'react';
import { useFormContext, UseFormMethods, Controller, ControllerRenderProps } from 'react-hook-form';
import { SystemStyleObject } from '@chakra-ui/styled-system';
import { get } from 'lodash';

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
  children: (methods: UseFormMethods, controllerProps: ControllerRenderProps, isInvalid: boolean) => ReactElement;
}

const FieldPrototype = ({ children, name, isRequired = true, ...props }: IProps) => {
  const methods = useFormContext();
  const isInvalid = Boolean(get(methods.errors, name));

  return (
    <FieldControl errorText={get(methods.errors, name)?.message} isInvalid={isInvalid} name={name} isRequired={isRequired} {...props}>
      <Controller
        name={name}
        render={props => {
          return children(methods, props, isInvalid);
        }}
      />
    </FieldControl>
  );
};

export { FieldPrototype };
