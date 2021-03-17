import React, { useState } from 'react';
import dayjs, { extend } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { HStack, VStack, Center, Divider, Text, Box } from '@chakra-ui/react';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { useIntl, FormattedMessage } from 'react-intl';
import { useFormContext } from 'react-hook-form';

import { Button, IconButton } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { FetchBoundary } from 'shared/Suspense';

import { getBookingTerms, getBookingTermsKey } from '../../../../infrastructure/query';
import { useFacilityConsumer } from '../../../../../context';
import { AvailableEmployeeSelectAsync } from './AvailableEmployeeSelectAsync';
import { WeekRadioGroup } from './WeekRadioGroup';
import { DayRadioGroup } from './DayRadioGroup';
import { Summary } from './Summary';
import { Footer } from './Footer';

extend(weekday);

interface IProps {
  offerId: string;
  index: number;
  onClose: () => void;
}

const TermSelector = ({ offerId, index, onClose }: IProps) => {
  const { formatMessage } = useIntl();
  const { facilityId } = useFacilityConsumer();
  const { setValue } = useFormContext();

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
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();

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
    setSelectedEmployeeId(undefined);
  };

  const decreaseRange = () => {
    setStartRange(range => range - weekDayCount);
    setEndRange(range => range - weekDayCount);
    setMonday(date => date.add(-weekDayCount, 'day'));
    setSunday(date => date.add(-weekDayCount, 'day'));
    setSelectedDay(date => dayjs(date).add(-weekDayCount, 'day').toDate().toString());
    setSelectedEmployeeId(undefined);
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
      <VStack mt={3} mb={6}>
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
          <WeekRadioGroup
            weekDates={getCurrentWeekDates().dayjsDates}
            selectedDay={selectedDay}
            setSelectedDay={day => {
              setSelectedDay(day);
              setSelectedEmployeeId(undefined);
            }}
          />
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
            const selectedBookingTerm = collection.find(term => dayjs(term.date).format('H-m') === dayjs(selectedTerm).format('H-m'));

            return (
              <VStack spacing={8} align='flex-start'>
                <DayRadioGroup
                  selectedTerm={selectedTerm}
                  setSelectedTerm={term => {
                    setSelectedTerm(term);
                    setSelectedEmployeeId(undefined);
                  }}
                  availableTerms={collection.map(term => term.date)}
                  selectedDay={selectedDay}
                />
                <AvailableEmployeeSelectAsync
                  facilityId={facilityId}
                  bookingTerm={selectedBookingTerm}
                  selectedEmployeeId={selectedEmployeeId}
                  setEmployeeId={setSelectedEmployeeId}
                />
              </VStack>
            );
          }}
        </FetchBoundary>
      </VStack>
      <Summary selectedTerm={selectedTerm} />
      <Footer
        onClose={onClose}
        isDisabled={!selectedEmployeeId || !selectedTerm}
        onAccept={() => {
          setValue(`bookedRecords[${index}].date`, selectedTerm);
          setValue(`bookedRecords[${index}].employeeId`, selectedEmployeeId);
          onClose();
        }}
      />
    </Box>
  );
};

export { TermSelector };
