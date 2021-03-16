import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, HStack, RadioProps, useRadio, useRadioGroup, VStack, useColorModeValue } from '@chakra-ui/react';

import { FormattedDate } from 'shared/Date';

const RadioButton = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const checkedColor = useColorModeValue('primary.500', 'primary.300');

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        _checked={{
          bg: checkedColor,
          color: 'gray.700',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        _disabled={{
          opacity: 0.4,
        }}
        px={{ base: 2, md: 5, lg: 6 }}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
};

interface IProps {
  weekDates: Dayjs[];
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

const WeekRadioGroup = ({ weekDates, selectedDate, setSelectedDate }: IProps) => {
  const today = dayjs().hour(6).minute(0).second(0).toISOString();
  const todaySignature = dayjs().format('D-M');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'selectedDate',
    defaultValue: weekDates.find(date => date.format('D-M') === todaySignature)?.toISOString(),
    onChange: value => setSelectedDate(value as string),
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {weekDates.map(date => {
        const stringDate = date.toISOString();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const radio = getRadioProps({ value: stringDate } as any);

        return (
          <VStack key={stringDate}>
            <Box fontSize='sm' textTransform='capitalize'>
              <FormattedDate value={stringDate} format='ddd' />
            </Box>
            <RadioButton
              isDisabled={dayjs(date).add(1, 'day').isBefore(today)}
              {...radio}
              isChecked={date.format('D-M') === dayjs(selectedDate).format('D-M')}
            >
              <FormattedDate value={stringDate} format='DD' />
            </RadioButton>
          </VStack>
        );
      })}
    </HStack>
  );
};

export { WeekRadioGroup };
