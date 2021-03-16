import React, { useState } from 'react';
import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { HStack, VStack, Center, Divider, Text, Box, chakra } from '@chakra-ui/react';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { useIntl, FormattedMessage } from 'react-intl';

import { Button, IconButton } from 'shared/Button';
import { FormattedDate } from 'shared/Date';

import { WeekRadioGroup } from './WeekRadioGroup';
import { FetchBoundary } from '../../../../../../shared/Suspense';
import { getBookingTerms, getBookingTermsKey } from '../../../../infrastructure/query';
import { useFacilityConsumer } from '../../../../../context';
import { DayRadioGroup } from './DayRadioGroup';
import { Summary } from './Summary';

extend(weekday);

interface IProps {
  offerId: string;
}

const TermSelector = ({ offerId }: IProps) => {
  const { formatMessage } = useIntl();
  const { facilityId } = useFacilityConsumer();

  const mondayIndex = 1;
  const sundayIndex = 7;
  const weekDayCount = 7;
  const todaySignature = dayjs().format('D-M');
  const today = dayjs().hour(6).minute(0).second(0).toISOString();

  const [startRange, setStartRange] = useState(mondayIndex);
  const [endRange, setEndRange] = useState(sundayIndex);
  const [monday, setMonday] = useState(dayjs().weekday(mondayIndex));
  const [sunday, setSunday] = useState(dayjs().weekday(sundayIndex));
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTerm, setSelectedTerm] = useState<string>();

  console.log(selectedTerm);

  const getCurrentWeekDates = () => {
    const weekDates = [];

    for (let i = startRange; i <= endRange; i++) {
      weekDates.push(dayjs().weekday(i));
    }

    return { dayjsDates: weekDates, ISODates: weekDates.map(date => date.toDate().toString()) };
  };

  const increaseRange = () => {
    setStartRange(range => range + weekDayCount);
    setEndRange(range => range + weekDayCount);
    setMonday(date => date.add(weekDayCount, 'day'));
    setSunday(date => date.add(weekDayCount, 'day'));
    setSelectedDay(date => dayjs(date).add(weekDayCount, 'day').toDate().toString());
  };

  const decreaseRange = () => {
    setStartRange(range => range - weekDayCount);
    setEndRange(range => range - weekDayCount);
    setMonday(date => date.add(-weekDayCount, 'day'));
    setSunday(date => date.add(-weekDayCount, 'day'));
    setSelectedDay(date => dayjs(date).add(-weekDayCount, 'day').toDate().toString());
  };

  const isPrevButtonDisabled = () => {
    return getCurrentWeekDates()
      .dayjsDates.map(date => date.format('D-M'))
      .some(value => value === todaySignature);
  };

  const prevBtnTitle = formatMessage({ id: 'previous-week', defaultMessage: 'Previous week' });
  const nextBtnTitle = formatMessage({ id: 'next-week', defaultMessage: 'Next week' });

  return (
    <Box>
      <VStack mt={3}>
        <Center mb={1} textTransform='capitalize'>
          <FormattedDate value={getCurrentWeekDates().ISODates[0]} format='MMMM YYYY' />
        </Center>
        <Divider my={2} />
        <HStack spacing={{ base: 1, md: 2 }} mb={2}>
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            onClick={decreaseRange}
            isDisabled={isPrevButtonDisabled()}
            path={mdiArrowLeft}
            title={isPrevButtonDisabled() ? '' : prevBtnTitle}
            mt='28px !important'
          />
          <WeekRadioGroup weekDates={getCurrentWeekDates().dayjsDates} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            onClick={increaseRange}
            path={mdiArrowRight}
            title={nextBtnTitle}
            mt='28px !important'
          />
        </HStack>
        <HStack w='100%' maxW='290px' display={{ base: 'flex', md: 'none' }} justify='space-between'>
          <Button onClick={decreaseRange} isDisabled={isPrevButtonDisabled()}>
            {prevBtnTitle}
          </Button>
          <Button onClick={increaseRange}>{nextBtnTitle}</Button>
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
        <FetchBoundary
          queryKey={getBookingTermsKey(facilityId, { dateFrom: monday.toISOString(), dateTo: sunday.toISOString(), offerId })}
          queryFn={() => getBookingTerms(facilityId, { dateFrom: monday.toISOString(), dateTo: sunday.toISOString(), offerId })}
        >
          {({ data: { collection } }) => {
            return (
              <DayRadioGroup
                selectedTerm={selectedTerm}
                setSelectedTerm={setSelectedTerm}
                availableTerms={collection.map(term => term.date)}
                selectedDay={selectedDay}
              />
            );
          }}
        </FetchBoundary>
      </VStack>
      <Summary selectedTerm={selectedTerm} />
    </Box>
  );
};

export { TermSelector };
