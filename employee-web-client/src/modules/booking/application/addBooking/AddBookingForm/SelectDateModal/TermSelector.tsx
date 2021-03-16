import React, { useState } from 'react';
import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { HStack, VStack, Center, Divider, Text } from '@chakra-ui/react';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { useIntl, FormattedMessage } from 'react-intl';

import { IconButton } from 'shared/Button';
import { FormattedDate } from 'shared/Date';

import { WeekRadioGroup } from './WeekRadioGroup';

extend(weekday);

const TermSelector = () => {
  const { formatMessage } = useIntl();

  const mondayIndex = 1;
  const sundayIndex = 7;
  const weekDayCount = 7;
  const todaySignature = dayjs().format('D-M');
  const today = dayjs().hour(6).minute(0).second(0).toISOString();

  const [startRange, setStartRange] = useState(mondayIndex);
  const [endRange, setEndRange] = useState(sundayIndex);
  const [monday, setMonday] = useState(dayjs().weekday(mondayIndex).hour(6).minute(0).second(0));
  const [sunday, setSunday] = useState(dayjs().weekday(sundayIndex).hour(22).minute(0).second(0));
  const [selectedDate, setSelectedDate] = useState(today);

  const getCurrentWeekDates = () => {
    const weekDates = [];

    for (let i = startRange; i <= endRange; i++) {
      weekDates.push(dayjs().weekday(i).hour(6).minute(0).second(0));
    }

    return { dayjsDates: weekDates, ISODates: weekDates.map(date => date.toISOString()) };
  };

  const increaseRange = () => {
    setStartRange(range => range + weekDayCount);
    setEndRange(range => range + weekDayCount);
    setMonday(date => date.add(weekDayCount, 'day'));
    setSunday(date => date.add(weekDayCount, 'day'));
    setSelectedDate(date => dayjs(date).add(weekDayCount, 'day').toISOString());
  };

  const decreaseRange = () => {
    setStartRange(range => range - weekDayCount);
    setEndRange(range => range - weekDayCount);
    setMonday(date => date.add(-weekDayCount, 'day'));
    setSunday(date => date.add(-weekDayCount, 'day'));
    setSelectedDate(date => dayjs(date).add(-weekDayCount, 'day').toISOString());
  };

  const isPrevButtonDisabled = () => {
    return getCurrentWeekDates()
      .dayjsDates.map(date => date.format('D-M'))
      .some(value => value === todaySignature);
  };

  return (
    <VStack mt={3}>
      <Center mb={1} textTransform='capitalize'>
        <FormattedDate value={getCurrentWeekDates().ISODates[0]} format='MMMM YYYY' />
      </Center>
      <Divider my={2} />
      <HStack mb={2}>
        <IconButton
          onClick={decreaseRange}
          isDisabled={isPrevButtonDisabled()}
          path={mdiArrowLeft}
          title={isPrevButtonDisabled() ? '' : formatMessage({ id: 'previous-week', defaultMessage: 'Previous week' })}
          mt='27px !important'
        />
        <WeekRadioGroup weekDates={getCurrentWeekDates().dayjsDates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <IconButton
          onClick={increaseRange}
          path={mdiArrowRight}
          title={formatMessage({ id: 'next-week', defaultMessage: 'Next week' })}
          mt='27px !important'
        />
      </HStack>
      <Divider my={2} mb={3} />
      <HStack w='100%' justify='space-around' fontSize='sm'>
        <Text>
          <FormattedMessage id='morning' defaultMessage='Morning' />
        </Text>
        <Text>
          <FormattedMessage id='afternoon' defaultMessage='Afternoon' />
        </Text>
        <Text>
          <FormattedMessage id='evening' defaultMessage='Evening' />
        </Text>
      </HStack>
      <Divider my={2} />
    </VStack>
  );
};

export { TermSelector };
