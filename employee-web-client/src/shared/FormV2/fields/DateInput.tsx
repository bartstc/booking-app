import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { kebabCase } from 'lodash';

import { mapInputDate, mapOutputDate } from 'utils';

import { DatePicker } from 'shared/DateV2';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField, IFormFieldProps } from '../presentation';
import { IBasicFieldProps } from './IBasicFieldProps';
import { useErrorMessage } from './useErrorMessage';
import { propsAreEqual } from './utils';

export interface IDateProps extends IBasicFieldProps, IFormFieldProps {
  maxDate?: Date | null;
  minDate?: Date | null;
  todayButton?: React.ReactNode;
  placeholder?: string;
}

// eslint-disable-next-line react/display-name
const DateInput = memo(({ register, maxDate, minDate, todayButton, placeholder, ...props }: IDateProps) => {
  const autoValidation = useConfigurationValue('autoValidation');
  const control = useFormContextSelector(state => state.control);
  const error = useErrorMessage(props.name);
  const {
    field: { onChange, value, onBlur, ref },
  } = useController({
    name: props.name,
    control,
    rules: {
      required: {
        value: (autoValidation && props.isRequired) ?? false,
        message: 'Field is required',
      },
      ...register,
    },
  });

  return (
    <FormField {...props} label={props.children ?? props.label} isInvalid={!!error} errorMessage={error}>
      <DatePicker
        name={props.name}
        id={kebabCase(props.name)}
        selected={mapOutputDate(value)}
        onChange={mapInputDate(onChange)}
        onBlur={onBlur}
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        todayButton={todayButton}
        customInputRef={ref as unknown as string}
      />
    </FormField>
  );
}, propsAreEqual);

export { DateInput };
