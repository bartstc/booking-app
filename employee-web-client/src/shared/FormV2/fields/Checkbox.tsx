import React, { memo } from 'react';
import { useController } from 'react-hook-form';

import { Checkbox as CCheckBox, CheckboxProps, chakra, GridItemProps } from '@chakra-ui/react';

import { useFormContextSelector } from '../FormProvider';
import { mapGridProps, GridProp } from '../utils';
import { IBasicFieldProps } from './IBasicFieldProps';
import { useErrorMessage } from './useErrorMessage';
import { propsAreEqual } from './utils';

export interface ICheckboxProps<Value = string>
  extends IBasicFieldProps,
    Omit<CheckboxProps, 'name' | 'onChange' | 'isChecked' | 'defaultValue'>,
    Pick<GridItemProps, GridProp> {
  onChange?(setValue: (set: (value: Value) => Value) => void, event: React.ChangeEvent<HTMLInputElement>): void;

  isChecked?(value: Value): boolean;

  size?: 'sm' | 'md';
  defaultValue?: Value;
}

function Checkbox<Value = string>({
  register: registerProp,
  onChange: onChangeProp,
  isChecked,
  children,
  size,
  defaultValue,
  colSpan,
  colStart,
  colEnd,
  rowEnd,
  rowSpan,
  rowStart,
  ...props
}: ICheckboxProps<Value>) {
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
        message: 'Pole jest wymagane.',
      },
      ...registerProp,
    },
  });
  const setValue = useFormContextSelector(state => state.setValue);
  const error = useErrorMessage(props.name);

  const styles = mapGridProps({
    colSpan,
    rowStart,
    rowSpan,
    colEnd,
    colStart,
    rowEnd,
  });

  return (
    <CCheckBox
      {...props}
      sx={styles}
      isInvalid={!!error}
      ref={ref}
      value={value}
      onChange={event => {
        if (!onChangeProp) {
          return onChange(event);
        }

        onChangeProp(set => {
          const newValue = set(value);
          setValue(props.name, newValue);
        }, event);
      }}
      onBlur={onBlur}
      isChecked={isChecked ? isChecked(value) : undefined}
    >
      <chakra.div display='flex' flexDirection='row' alignItems='center' fontSize={size} color={error ? 'red.500' : undefined}>
        {children}
      </chakra.div>
    </CCheckBox>
  );
}

const MemoCheckbox = memo(Checkbox, propsAreEqual) as typeof Checkbox;

export { MemoCheckbox as Checkbox };
