import React, { useEffect } from 'react';
import { Box, SimpleGrid, useColorModeValue, VStack, HStack, useTheme, GridItem } from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { FormattedMessage } from 'react-intl';

import { PageWrapper } from 'shared/Layout/Page';

import { useWeekRange } from 'hooks';
import { dayjs } from 'utils/dayjs';

import { IconButton } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { useFacilityConsumer } from 'modules/context';
import { useQueryParams } from 'shared/Params';
import { WeekDaysGrid } from 'shared/Calendar';
import { useBookedRecordsQuery } from 'modules/booking/infrastructure/query';

import { Header } from './Header';
import { BookingDatePicker } from './BookingDatePicker';
import { EmployeeSelect } from './EmployeeSelect';

export interface BookingPageQueryParams {
  dateFrom: string;
  dateTo: string;
  employeeId?: string;
}

const Booking = () => {
  const { set, params } = useQueryParams<BookingPageQueryParams>();
  const { colors } = useTheme();

  const color = useColorModeValue('primary.500', 'primary.300');
  const weekTextColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  const { facilityId } = useFacilityConsumer();

  const {
    saturday,
    sunday,
    trackedDay,
    weekDates,
    nextWeek,
    prevWeek,
    setWeek,
    isPrevWeekNotAllowed,
    isNextWeekNotAllowed,
    isInRange,
  } = useWeekRange({
    startDate: params.dateFrom ? dayjs(params.dateFrom) : undefined,
    minDate: dayjs(),
  });

  const dateFrom = sunday.format('YYYY-MM-DDT00:00:00.000');
  const dateTo = sunday.format('YYYY-MM-DDT23:59:59.000');

  useEffect(() => {
    set({
      ...params,
      dateFrom,
      dateTo,
    });
  }, [dateTo, dateFrom]);

  const bookedRecords = useBookedRecordsQuery(facilityId, { dateTo, dateFrom });

  return (
    <PageWrapper maxW='1600px'>
      <Header />
      <VStack w='100%' spacing={0}>
        <SimpleGrid w='100%' columns={3} spacingX={4} mb={1}>
          <GridItem as={VStack} colSpan={3} spacing={-1}>
            <HStack spacing={3} fontSize='lg'>
              <IconButton onClick={prevWeek} isDisabled={isPrevWeekNotAllowed} path={mdiChevronLeft} title='' />
              <HStack color={color}>
                <FormattedDate value={sunday.toDate().toString()} format={'DD MMM'} />
                <Box>-</Box>
                <FormattedDate value={saturday.toDate().toString()} format={'DD MMM'} />
                <FormattedDate value={sunday.toDate().toString()} format='YYYY' />
              </HStack>
              <IconButton onClick={nextWeek} isDisabled={isNextWeekNotAllowed} path={mdiChevronRight} title='' />
            </HStack>
            <Box fontSize='sm' pb={{ base: 4, md: 8 }} color={weekTextColor}>
              <FormattedMessage
                id='week'
                defaultMessage='Week {week}'
                values={{
                  week: saturday.week(),
                }}
              />
            </Box>
          </GridItem>
          <GridItem as={HStack} colSpan={3} mb={4} w='100%'>
            <BookingDatePicker trackedDay={trackedDay} setWeek={setWeek} />
            <EmployeeSelect facilityId={facilityId} />
          </GridItem>
        </SimpleGrid>
        <WeekDaysGrid weekDates={weekDates} ignoreFirst />
        <SimpleGrid w='100%' spacingX={0} columns={7}>
          {weekDates.map((day, index) => {
            const dayRecords = bookedRecords.filter(record => dayjs(record.dateFrom).format('D-M') === day.format('D-M'));

            return (
              <HStack fontSize='sm' justify='center' minH='32px' key={index} border={`1px solid ${borderColor}`} borderTop='none'>
                <FormattedMessage
                  id='reservations-count'
                  defaultMessage='Reservations: {amount}'
                  values={{
                    amount: dayRecords.length,
                  }}
                />
              </HStack>
            );
          })}
        </SimpleGrid>
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Booking);
