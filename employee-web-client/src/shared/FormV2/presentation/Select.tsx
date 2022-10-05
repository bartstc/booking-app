import React, { ComponentType } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ReactSelect, { components, Props } from 'react-select';

import { useFormControl, useColorModeValue, useTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from 'lodash';

export type OptionType<Value> = { label: string; value: Value };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ISelectProps<Value = any> extends Props<OptionType<Value>> {
  isInvalid?: boolean;
  inputRef?: React.Ref<unknown>;
}

function Select<Value>(props: ISelectProps<Value>) {
  const { formatMessage } = useIntl();
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
    <Container
      loadingMessage={() => formatMessage(messages.loading)}
      noOptionsMessage={() => formatMessage(messages.noResults)}
      className='react-select-container'
      classNamePrefix='react-select'
      // @ts-ignore
      ref={props.inputRef}
      {...props}
      placeholder={props.placeholder === undefined ? '' : props.placeholder}
      components={{
        Input: CustomInput,
        ...props.components,
      }}
      styles={{
        control: (base, { isFocused, isDisabled }) => ({
          ...base,
          opacity: isDisabled ? '.55' : '1',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: `0 0 0 ${isFocused || props.isInvalid ? '2px' : '1px'} ${
            isFocused ? focusColor : props.isInvalid ? invalidColor : boxShadowColor
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomInput = (props: any) => {
  const formControlProps = useFormControl<HTMLInputElement>({});
  const inputProps = omit(formControlProps, ['onBlur', 'onFocus']);

  return <components.Input {...props} {...inputProps} name={props?.selectProps?.name} />;
};

const Container = styled(ReactSelect)<ISelectProps>`
  .react-select__control {
    transition: all 0.2s;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    border: 1px solid;
    border-color: inherit;
    background: inherit;
    min-height: 40px;

    :hover {
      border-color: #cbd5e0;
    }

    ${props =>
      props.isInvalid &&
      css`
        border-color: #e53e3e;
        box-shadow: 0 0 0 1px #e53e3e;

        :hover {
          border-color: #e53e3e;
        }
      `}
  }

  .react-select__control--is-focused {
    z-index: 1;
    border-color: #3182ce;
    box-shadow: 0 0 0 1px #3182ce;

    :hover {
      border-color: #3182ce;
    }
  }

  .react-select__value-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .react-select__menu {
    z-index: 5;
  }

  .react-select__placeholder {
    color: var(--chakra-colors-gray-500);
  }
` as ComponentType<ISelectProps>;

const messages = defineMessages({
  loading: {
    id: 'Select.loading',
    defaultMessage: 'Loading...',
  },
  noResults: {
    id: 'Select.noResults',
    defaultMessage: 'No results',
  },
});

export { Select };
