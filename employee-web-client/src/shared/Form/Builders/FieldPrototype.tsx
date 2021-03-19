import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import { Text } from '@chakra-ui/react';

import { OverrideUseFormMethods } from 'typings/react-hook-form';

import { FieldControl, IFieldControlProps } from './FieldControl';
import { FormStatus } from '../FormStatus';
import { GridItemProps } from '../types';

interface ReadModeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface FieldPrototypeProps extends GridItemProps {
  name: string;
  label: ReactNode | string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  tip?: ReactNode | string;
  helperText?: ReactNode;
  readModeComponent?: ComponentType<ReadModeProps>;
}

interface InnerPrototypeProps {
  isInvalid: boolean;
}

interface IProps extends Omit<IFieldControlProps, 'children' | 'errorText'> {
  children: (methods: OverrideUseFormMethods, controllerProps: ControllerRenderProps, innerProps: InnerPrototypeProps) => ReactElement;
  readModeComponent?: ComponentType<ReadModeProps>;
}

const ReadMode = ({ value }: ReadModeProps) => {
  return <Text>{value ? value : '---'}</Text>;
};

const FieldPrototype = ({ children, name, isRequired = true, readModeComponent = ReadMode, ...props }: IProps) => {
  const methods = useFormContext();
  const isInvalid = Boolean(get(methods.errors, name));
  const ReadModeComponent = readModeComponent;

  return (
    <FieldControl
      errorText={get(methods.errors, name)?.message}
      isInvalid={isInvalid}
      name={name}
      isRequired={isRequired}
      isReadMode={methods.status === FormStatus.Read_mode}
      {...props}
    >
      <Controller
        name={name}
        render={props => {
          if (methods.status === FormStatus.Read_mode) {
            return <ReadModeComponent value={props.value} />;
          }

          return children(methods, props, { isInvalid });
        }}
      />
    </FieldControl>
  );
};

export { FieldPrototype };
