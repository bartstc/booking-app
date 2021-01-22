import React from 'react';
import ReactSelect, { NamedProps } from 'react-select';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface OptionType<T = any> {
  label: string;
  value: T;
}

export type SelectInputProps = NamedProps<OptionType, boolean> & {
  options: OptionType[];
  isInvalid?: boolean;
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
  const listBgColor = useColorModeValue(colors.white, colors.gray[700]);
  const selectedBgColor = useColorModeValue(colors.blue[500], colors.blue[300]);
  const invalidColor = useColorModeValue(colors.red[500], colors.red[300]);
  const placeholderColor = useColorModeValue(colors.gray[400], colors.gray[600]);

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
          opacity: isDisabled ? '.6' : '1',
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
      }}
    />
  );
};

export { SelectInput };
