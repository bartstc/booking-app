import React, { useEffect } from 'react';
import { VStack, Box, HStack, useColorModeValue, SimpleGrid, GridItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

import { useWeekRange } from 'hooks';
import { dayjs } from 'utils/dayjs';

import { useScheduleQuery } from 'modules/schedules/infrastructure/query';
import { RangeWeekDatesProvider } from 'modules/schedules/presentation';
import { useFacilityConsumer } from 'modules/context';

import { PageWrapper } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { FormattedDate } from 'shared/Date';
import { IconButton } from 'shared/Button';
import { useQueryParams } from 'shared/Params';
import { WeekDaysGrid, WorkingDaysGrid } from 'shared/Calendar';

import { Header } from './Header';
import { AvailableEmployeesGrid } from './AvailableEmployeesGrid';
import { ScheduleDatePicker } from './AvailableEmployeesGrid/ScheduleDatePicker';

const Schedule = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const { set, params } = useQueryParams<{ startTime: string; endTime: string }>();

  const { facilityId, workingDays } = useFacilityConsumer();

  const color = useColorModeValue('primary.500', 'primary.300');
  const weekTextColor = useColorModeValue('gray.500', 'gray.400');

  const schedule = useScheduleQuery(facilityId, scheduleId);

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
    startDate: dayjs(params.startTime ?? schedule.startDate),
    minDate: dayjs(schedule.startDate),
    maxDate: dayjs(schedule.endDate),
  });

  const startTime = sunday.format('YYYY-MM-DDT00:00:00.000');
  const endTime = sunday.format('YYYY-MM-DDT23:59:59.000');

  useEffect(() => {
    set({
      startTime,
      endTime,
    });
  }, [startTime, endTime]);

  return (
    <PageWrapper maxW='1600px'>
      <Header schedule={schedule} />
      <VStack w='100%' spacing={0}>
        <SimpleGrid w='100%' columns={3} spacingX={4}>
          <ScheduleDatePicker trackedDay={trackedDay} setWeek={setWeek} startDate={schedule.startDate} endDate={schedule.endDate} />
          <GridItem as={VStack} colSpan={{ base: 3, lg: 1 }} spacing={-1}>
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
        </SimpleGrid>
        <WeekDaysGrid weekDates={weekDates} />
        <WorkingDaysGrid workingDays={workingDays} />
        <RangeWeekDatesProvider
          data={{
            startTime: sunday.format('YYYY-MM-DDT00:00:00.000'),
            endTime: saturday.format('YYYY-MM-DDT23:59:59.000'),
          }}
        >
          <AvailableEmployeesGrid isInRange={isInRange} weekDates={weekDates} />
        </RangeWeekDatesProvider>
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Schedule);
