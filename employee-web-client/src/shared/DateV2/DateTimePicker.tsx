import React, { useRef } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import MaskedInput from 'react-text-mask';

import { HStack, chakra } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { kebabCase } from 'lodash';

import { dayjs } from 'utils';

import { DatePicker } from './DatePicker';
import { TimeInput } from './TimeInput';

interface IProps extends Omit<ReactDatePickerProps, 'selected' | 'onChange'> {
  selected: Date | null;

  onChange(value: Date | null): void;

  isInvalid?: boolean;
}

const DateTimePicker = ({ selected, onChange, isInvalid, ...rest }: IProps) => {
  const timerRef = useRef<MaskedInput | null>(null);

  return (
    <>
      <Global
        styles={{
          '.form-datetime-picker-wrapper': {
            width: '100%',
          },
        }}
      />
      <HStack>
        <chakra.div flex={2} minW='145px'>
          <DatePicker
            wrapperClassName='form-datetime-picker-wrapper'
            selected={selected}
            onChange={date => {
              if (date === null) {
                onChange(null);
              }
              if (date instanceof Date) {
                onChange(date);
              }
            }}
            onSelect={() => {
              // timeout żeby input miał czas na zmianę isDisabled
              // słabe rozwiązanie, można popracować nad lepszym
              setTimeout(() => {
                timerRef.current?.inputElement.focus();
              });
            }}
            placeholderText='YYYY-MM-DD'
            isInvalid={isInvalid}
            {...rest}
          />
        </chakra.div>
        <TimeInput
          id={`${kebabCase(rest.name)}-time`}
          value={selected}
          onChange={value => {
            if (value === null) {
              if (selected !== null) {
                onChange(dayjs(selected).hour(0).minute(0).toDate());
              }
              return;
            }
            onChange(value.value);
          }}
          placeholder='00:00'
          isDisabled={selected === null}
          ref={timerRef}
          isInvalid={isInvalid}
        />
      </HStack>
    </>
  );
};

export { DateTimePicker };
