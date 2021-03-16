import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, HStack, RadioProps, useRadio, useRadioGroup, VStack, useColorModeValue } from '@chakra-ui/react';

import { FormattedDate } from 'shared/Date';

const RadioButton = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const bg = useColorModeValue('transparent', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const color = useColorModeValue('gray.600', 'white');
  const checkedColor = useColorModeValue('primary.500', 'primary.300');
  const checkedBgColor = useColorModeValue('transparent', 'gray.600');
  const checkedBorderColor = useColorModeValue('primary.500', 'primary.300');

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='2px'
        fontWeight='700'
        borderRadius='md'
        borderColor={borderColor}
        color={color}
        bg={bg}
        _checked={{
          bg: checkedBgColor,
          color: checkedColor,
          borderColor: checkedBorderColor,
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
  selectedDay: string;
  setSelectedDay: (value: string) => void;
}

const WeekRadioGroup = ({ weekDates, selectedDay, setSelectedDay }: IProps) => {
  const today = dayjs().toDate().toString();
  const todaySignature = dayjs().format('D-M');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'selectedDay',
    defaultValue: weekDates
      .find(date => date.format('D-M') === todaySignature)
      ?.toDate()
      .toString(),
    onChange: value => setSelectedDay(value as string),
  });

  const group = getRootProps();

  return (
    <HStack spacing={{ base: 1, md: 2 }} {...group}>
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
              isDisabled={dayjs(date).isBefore(today)}
              {...radio}
              isChecked={date.format('D-M') === dayjs(selectedDay).format('D-M')}
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
