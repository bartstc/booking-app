import React, { ReactElement } from 'react';
import { useFormContext, UseFormMethods, Controller, ControllerRenderProps } from 'react-hook-form';

import { FieldControl, IFieldControlProps } from './FieldControl';

interface IProps extends Omit<IFieldControlProps, 'children' | 'errorText'> {
  children: (methods: UseFormMethods, controllerProps: ControllerRenderProps) => ReactElement;
}

const FieldPrototype = ({ children, name, isRequired = true, ...props }: IProps) => {
  const methods = useFormContext();
  console.log(methods);
  const isInvalid = Boolean(methods.errors[name]);

  // todo: form read mode

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
