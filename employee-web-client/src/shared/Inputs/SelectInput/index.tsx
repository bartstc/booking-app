import React from 'react';
import ReactSelect, { NamedProps } from 'react-select';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

import { OptionType } from 'types';

export type SelectInputProps = NamedProps<OptionType, boolean> & {
  options: OptionType[];
  isInvalid?: boolean;
};

type Options = OptionType[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValue = (value: unknown, isMulti: boolean): any => {
  if (value === null || value === undefined) {
    if (isMulti) {
      return [];
    }

    return null;
  }

  return value;
};

const findOptions = (selectedValues: Array<unknown>, options: Options): Options => {
  if (options.length === 0) {
    return [];
  }

  if (selectedValues.length === 0) {
    return [];
  }

  return selectedValues.map(selectedValue => {
    const result = options.find(option => option.value === selectedValue)!;

    if (result === undefined) {
      return { label: selectedValue as string, value: selectedValue };
    }

    return result;
  });
};

const findOption = (selectedValue: unknown, options: Options): OptionType | null => {
  if (selectedValue === null) {
    return null;
  }

  if (selectedValue === '') {
    return null;
  }

  if (typeof selectedValue === 'object') {
    throw new Error(`FormSelect: incorrect value type`);
  }

  return (
    options.find(option => {
      if (typeof option.value === 'object') {
        throw new Error(`FormSelect: incorrect value type`);
      }
      return option.value === selectedValue;
    }) || { label: selectedValue as string, value: selectedValue }
  );
};

const getReadValue = (value: unknown, options: Options, isMulti: boolean) => {
  if (isMulti) {
    return findOptions(getValue(value, isMulti), options)
      .map(opt => opt.label)
      .join(', ');
  }
  const option = findOption(getValue(value, isMulti), options) || { label: '' };
  return option.label;
};

const SelectInput = ({
  isInvalid,
  isClearable = true,
  noOptionsMessage = () => 'No options',
  loadingMessage = () => 'Loading...',
  ...props
}: SelectInputProps) => {
  const { colors } = useTheme();
  const textColor = useColorModeValue(colors.gray[700], colors.white);
  const focusColor = useColorModeValue(colors.blue[500], colors.blue[300]);
  const boxShadowColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const multiValueLabelBg = useColorModeValue(colors.gray[100], colors.gray[400]);
  const listBgColor = useColorModeValue(colors.white, colors.gray[700]);
  const selectedBgColor = useColorModeValue(colors.blue[500], colors.blue[300]);
  const invalidColor = useColorModeValue(colors.red[500], colors.red[300]);
  const placeholderColor = useColorModeValue(colors.gray[400], colors.gray[600]);
  const inputColor = useColorModeValue(colors.gray[900], colors.gray[100]);

  return (
    <ReactSelect
      placeholder=''
      isClearable={isClearable}
      noOptionsMessage={noOptionsMessage}
      loadingMessage={loadingMessage}
      className='react-select-container'
      classNamePrefix='react-select'
      {...props}
      styles={{
        control: (base, { isFocused, isDisabled }) => ({
          ...base,
          opacity: isDisabled ? '.55' : '1',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: `0 0 0 ${isFocused || isInvalid ? '2px' : '1px'} ${
            isFocused ? focusColor : isInvalid ? invalidColor : boxShadowColor
          }`,
        }),
        singleValue: base => ({
          ...base,
          color: textColor,
        }),
        input: base => ({
          ...base,
          color: inputColor,
        }),
        indicatorsContainer: base => ({
          ...base,
          color: 'red',
        }),
        option: (base, { isSelected }) => ({
          ...base,
          backgroundColor: isSelected ? selectedBgColor : listBgColor,
        }),
        menu: base => ({
          ...base,
          backgroundColor: listBgColor,
        }),
        placeholder: base => ({
          ...base,
          color: placeholderColor,
        }),
        multiValueLabel: base => ({
          ...base,
          backgroundColor: multiValueLabelBg,
        }),
        multiValueRemove: base => ({
          ...base,
          backgroundColor: multiValueLabelBg,
          borderRadius: '0',
        }),
      }}
    />
  );
};

export { SelectInput, getValue, getReadValue, findOption, findOptions };
