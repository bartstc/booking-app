/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { GroupedOptionsType, InputActionMeta, OptionsType } from 'react-select';

import { kebabCase } from 'lodash';

import { useFormContextSelector } from '../FormProvider';
import { useConfigurationValue } from '../configuration';
import { FormField, IFormFieldProps, Select as PresentationSelect, ISelectProps as IPresentationSelectProps } from '../presentation';
import { OptionType } from '../presentation/Select';
import { IBasicFieldProps } from './IBasicFieldProps';
import { useErrorMessage } from './useErrorMessage';
import { propsAreEqual } from './utils';

export interface ISelectProps<Value> extends IBasicFieldProps, Omit<IFormFieldProps, 'defaultValue'> {
  placeholder?: string;
  options: GroupedOptionsType<OptionType<Value>> | OptionsType<OptionType<Value>>;
  isMulti?: boolean;
  isClearable?: boolean;

  onInputChange?(newValue: string, actionMeta: InputActionMeta): void;

  onMenuScrollToBottom?: (event: React.SyntheticEvent<HTMLElement>) => void;
  isLoading?: boolean;
  defaultValue?: Value;
  hideSelectedOptions?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  components?: IPresentationSelectProps['components'];
  noOptionsMessage?: IPresentationSelectProps['noOptionsMessage'];
  loadingMessage?: IPresentationSelectProps['loadingMessage'];
}

function Select<Value>({
  register,
  placeholder,
  options,
  isMulti,
  isClearable,
  onInputChange,
  onMenuScrollToBottom,
  isLoading,
  defaultValue,
  hideSelectedOptions,
  isDisabled,
  isSearchable,
  components,
  noOptionsMessage,
  loadingMessage,
  ...props
}: ISelectProps<Value>) {
  const { formatMessage } = useIntl();

  const getMultiValue = (val: any) => {
    const result = options as OptionType<Value>[];
    if (!val) {
      return [];
    }
    return result.filter(option => val.includes(option.value));
  };
  const getSingleValue = (val: any) => {
    const result = options as OptionType<Value>[];
    return result.find(option => option.value === val) ?? null;
  };
  const autoValidation = useConfigurationValue('autoValidation');
  const control = useFormContextSelector(state => state.control);
  const error = useErrorMessage(props.name);
  const {
    field: { onChange, value, onBlur, ref },
  } = useController({
    name: props.name,
    control,
    defaultValue,
    rules: {
      required: {
        value: (autoValidation && props.isRequired) ?? false,
        message: 'Field is required',
      },
      ...register,
    },
  });

  const basicNoOptionsMessage = () =>
    formatMessage({
      id: 'orderGrantMode.noOptionsMessage',
      defaultMessage: 'No options',
    });
  const basicLoadingMessage = () =>
    formatMessage({
      id: 'orderGrantMode.loadingMessage',
      defaultMessage: 'Fetching options...',
    });

  return (
    <FormField {...props} label={props.children ?? props.label} isInvalid={!!error} errorMessage={error}>
      <PresentationSelect<Value>
        name={props.name}
        inputId={kebabCase(props.name)}
        options={options}
        isMulti={isMulti as false}
        isInvalid={!!error}
        // @ts-ignore
        value={isMulti ? getMultiValue(value) : getSingleValue(value)}
        onChange={value => {
          if (Array.isArray(value)) {
            return onChange(value.map(val => val.value));
          }
          onChange(value?.value ?? null);
        }}
        isClearable={isClearable === undefined ? !props.isRequired : isClearable}
        onBlur={onBlur}
        placeholder={placeholder}
        onInputChange={onInputChange}
        onMenuScrollToBottom={onMenuScrollToBottom}
        isLoading={isLoading}
        inputRef={ref}
        hideSelectedOptions={hideSelectedOptions}
        // @ts-ignore
        defaultValue={isMulti ? getMultiValue(defaultValue) : getSingleValue(defaultValue)}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        components={components}
        noOptionsMessage={noOptionsMessage ?? basicNoOptionsMessage}
        loadingMessage={loadingMessage ?? basicLoadingMessage}
      />
    </FormField>
  );
}

const MemoSelect = memo(Select, propsAreEqual) as typeof Select;

export { MemoSelect as Select };
