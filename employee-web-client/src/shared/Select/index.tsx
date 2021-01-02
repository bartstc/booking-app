import React from 'react';
import ReactSelect, { NamedProps } from 'react-select';
import { useIntl } from 'react-intl';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

import { OptionType } from 'types';

export interface SelectProps extends NamedProps<OptionType> {
  options: OptionType[];
}

const Select = ({ value, ...props }: SelectProps) => {
  const { formatMessage } = useIntl();
  const { colors } = useTheme();
  const textColor = useColorModeValue(colors.gray[700], colors.white);
  const focusColor = useColorModeValue(colors.blue[500], colors.blue[300]);
  const boxShadowColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const listBgColor = useColorModeValue(colors.white, colors.gray[700]);
  const selectedBgColor = useColorModeValue(colors.blue[500], colors.blue[300]);

  const findOption = (selectedValue: unknown): OptionType | null => {
    if (selectedValue === null) {
      return null;
    }

    if (typeof selectedValue === 'object') {
      return selectedValue as OptionType;
    }

    return (
      props.options.find(option => {
        if (typeof option.value === 'object') {
          throw new Error(`FormSelect: type of value ${props.id} equal to ${JSON.stringify(option.value)} is ${typeof option.value}`);
        }
        return option.value === selectedValue;
      }) || { label: selectedValue as string, value: selectedValue }
    );
  };

  // TODO findOptions()

  return (
    <ReactSelect
      placeholder={''}
      loadingMessage={() =>
        formatMessage({
          id: 'select-no-results',
          defaultMessage: 'No options',
        })
      }
      noOptionsMessage={() => formatMessage({ id: 'select-loading', defaultMessage: 'Loading...' })}
      className='react-select-container'
      classNamePrefix='react-select'
      {...props}
      value={findOption(value)}
      styles={{
        control: (base, { isFocused }) => ({
          ...base,
          backgroundColor: 'transparent',
          color: 'red !important',
          border: 'none',
          outline: 'none',
          boxShadow: `0 0 0 ${isFocused ? '2px' : '1px'} ${isFocused ? focusColor : boxShadowColor}`,
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
      }}
    />
  );
};

export { Select };
