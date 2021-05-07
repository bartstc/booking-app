import React, { useState } from 'react';
import dayjs from 'dayjs';
import { HStack, VStack, Divider, Text, Box } from '@chakra-ui/react';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import { useIntl, FormattedMessage } from 'react-intl';
import { useFormContext } from 'react-hook-form';

import { useWeekRange } from 'hooks';
import { Button, IconButton } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { FetchBoundary } from 'shared/Suspense';

import { bookingTermsQueryKey, bookingTermsQuery } from '../../../infrastructure/query';
import { useFacilityConsumer } from '../../../../context';
import { AvailableEmployeeSelectAsync } from './AvailableEmployeeSelectAsync';
import { WeekRadioGroup } from './WeekRadioGroup';
import { DayRadioGroup } from './DayRadioGroup';
import { Summary } from './Summary';
import { Footer } from './Footer';

interface IProps {
  offerId: string;
  index: number;
  onClose: () => void;
}

const TermSelector = ({ offerId, index, onClose }: IProps) => {
  const { formatMessage } = useIntl();
  const { facilityId } = useFacilityConsumer();
  const { setValue, watch } = useFormContext();

  const selectedEmployeeIdField = watch(`bookedRecords[${index}].employeeId`);
  const selectedTermField = watch(`bookedRecords[${index}].date`);
  const selectedTermFieldDate = selectedTermField ? dayjs(selectedTermField) : dayjs();

  const weekDayCount = 7;
  const currentDay = dayjs(selectedTermFieldDate).toDate().toString();

  const { sunday, saturday, isPrevWeekNotAllowed, weekDates, nextWeek, prevWeek } = useWeekRange({
    startDate: selectedTermFieldDate,
    minDate: dayjs(),
  });
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [selectedTerm, setSelectedTerm] = useState<string>(selectedTermFieldDate.toDate().toString());
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(
    !selectedEmployeeIdField ? undefined : selectedEmployeeIdField,
  );

  const increaseRange = () => {
    nextWeek();
    setSelectedDay(date => dayjs(date).add(weekDayCount, 'day').toDate().toString());
  };

  const decreaseRange = () => {
    prevWeek();
    setSelectedDay(date => dayjs(date).add(-weekDayCount, 'day').toDate().toString());
  };

  const prevBtnTitle = formatMessage({ id: 'previous-week', defaultMessage: 'Previous week' });
  const nextBtnTitle = formatMessage({ id: 'next-week', defaultMessage: 'Next week' });

  return (
    <Box>
      <VStack mt={3} mb={6}>
        <HStack fontSize={{ base: 'md', md: 'lg' }} mb={1}>
          <FormattedDate value={sunday.toDate().toString()} format={'DD MMM'} />
          <Box>-</Box>
          <FormattedDate value={saturday.toDate().toString()} format={'DD MMM'} />
          <FormattedDate value={sunday.toDate().toString()} format='YYYY' />
        </HStack>
        <Divider my={2} />
        <HStack spacing={{ base: 1, md: 2 }} mb={2}>
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            onClick={decreaseRange}
            isDisabled={isPrevWeekNotAllowed}
            path={mdiChevronLeft}
            title={isPrevWeekNotAllowed ? '' : prevBtnTitle}
            mt='28px !important'
          />
          <WeekRadioGroup weekDates={weekDates} selectedDay={selectedDay} setSelectedDay={day => setSelectedDay(day)} />
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            onClick={increaseRange}
            path={mdiChevronRight}
            title={nextBtnTitle}
            mt='28px !important'
          />
        </HStack>
        <HStack w='100%' maxW='290px' display={{ base: 'flex', md: 'none' }} justify='space-between'>
          <Button onClick={decreaseRange} isDisabled={isPrevWeekNotAllowed}>
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
          queryKey={bookingTermsQueryKey(facilityId, { dateFrom: sunday.toISOString(), dateTo: saturday.toISOString(), offerId })}
          queryFn={() => bookingTermsQuery(facilityId, { dateFrom: sunday.toISOString(), dateTo: saturday.toISOString(), offerId })}
        >
          {({ data: { collection } }) => {
            const selectedBookingTerm = collection.find(term => dayjs(term.date).format('H-m') === dayjs(selectedTerm).format('H-m'));

            return (
              <VStack w='100%' spacing={8} align='flex-start'>
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
