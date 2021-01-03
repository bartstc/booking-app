import React from 'react';
import ReactSelect, { NamedProps } from 'react-select';
import { useIntl } from 'react-intl';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

import { OptionType } from 'types';

export interface SelectProps extends NamedProps<OptionType, boolean> {
  options: OptionType[];
  isInvalid?: boolean;
}

const Select = ({ isInvalid, isClearable = true, ...props }: SelectProps) => {
  const { formatMessage } = useIntl();
  const { colors } = useTheme();
  const textColor = useColorModeValue(colors.gray[700], colors.white);
  const focusColor = useColorModeValue(colors.blue[500], colors.blue[300]);
  const boxShadowColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const listBgColor = useColorModeValue(colors.white, colors.gray[700]);
  const selectedBgColor = useColorModeValue(colors.blue[500], colors.blue[300]);
  const invalidColor = useColorModeValue(colors.red[500], colors.red[300]);

  return (
    <ReactSelect
      placeholder=''
      isClearable={isClearable}
      noOptionsMessage={() =>
        formatMessage({
          id: 'select-no-results',
          defaultMessage: 'No options',
        })
      }
      loadingMessage={() => formatMessage({ id: 'select-loading', defaultMessage: 'Loading...' })}
      className='react-select-container'
      classNamePrefix='react-select'
      {...props}
      styles={{
        control: (base, { isFocused }) => ({
          ...base,
          backgroundColor: 'transparent',
          color: 'red !important',
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
      }}
    />
  );
};

export { Select };
