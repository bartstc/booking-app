import React, { ComponentType } from 'react';
import ReactSelect, { NamedProps } from 'react-select';
import { useIntl } from 'react-intl';
import styled from '@emotion/styled';

import { OptionType } from 'types';

export interface SelectProps extends NamedProps<OptionType> {
  options: OptionType[];
}

const Select = ({ value, ...props }: SelectProps) => {
  const { formatMessage } = useIntl();

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
    <StyledSelect
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
    />
  );
};

const StyledSelect = styled(ReactSelect)<SelectProps>`
  .react-select__control {
    box-shadow: 0 0 0 1px ${props => (props.hasError ? '#e74c3c' : '#cad6e2')};
    border: none;
  }

  .react-select__control--is-focused {
    box-shadow: 0 0 0 2px ${props => (props.hasError ? '#e74c3c' : '#66afe9')};
    outline: none;
    border: none;
  }
` as ComponentType<SelectProps>;

export { Select };
