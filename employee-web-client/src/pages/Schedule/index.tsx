import React from 'react';
import dayjs from 'dayjs';
import { VStack, Box, HStack, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

import { useWeekRange } from 'hooks';

import { useScheduleQuery } from 'modules/schedules/infrastructure/query';
import { useFacilityConsumer } from 'modules/context';

import { PageWrapper } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { FormattedDate } from 'shared/Date';
import { IconButton } from 'shared/Button';

import { Header } from './Header';
import { AvailableEmployeesGrid } from './AvailableEmployeesGrid';
import { WorkingDaysGrid } from './WorkingDaysGrid';
import { WeekDaysGrid } from './WeekDaysGrid';

const Schedule = () => {
  const { formatMessage } = useIntl();
  const { facilityId, workingDays } = useFacilityConsumer();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const color = useColorModeValue('primary.500', 'primary.300');

  const schedule = useScheduleQuery(facilityId, scheduleId);

  const { saturday, sunday, weekDates, nextWeek, prevWeek, isPrevWeekNotAllowed, isNextWeekNotAllowed } = useWeekRange({
    dayWithinWeek: dayjs(schedule.startDate),
    minDate: dayjs(schedule.startDate),
    maxDate: dayjs(schedule.endDate),
  });

  const prevBtnTitle = formatMessage({ id: 'previous-week', defaultMessage: 'Previous week' });
  const nextBtnTitle = formatMessage({ id: 'next-week', defaultMessage: 'Next week' });

  return (
    <PageWrapper>
      <Header schedule={schedule} />
      <VStack w='100%' spacing={0} pb={{ base: 4, md: 10 }}>
        <HStack spacing={4} fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
          <IconButton
            onClick={prevWeek}
            isDisabled={isPrevWeekNotAllowed}
            path={mdiChevronLeft}
            title={isPrevWeekNotAllowed ? '' : prevBtnTitle}
          />
          <HStack color={color}>
            <FormattedDate value={sunday.toDate().toString()} format={'DD MMM'} />
            <Box>-</Box>
            <FormattedDate value={saturday.toDate().toString()} format={'DD MMM'} />
            <FormattedDate value={sunday.toDate().toString()} format='YYYY' />
          </HStack>
          <IconButton
            onClick={nextWeek}
            isDisabled={isNextWeekNotAllowed}
            path={mdiChevronRight}
            title={isNextWeekNotAllowed ? '' : nextBtnTitle}
          />
        </HStack>
        <WeekDaysGrid weekDates={weekDates} />
        <WorkingDaysGrid workingDays={workingDays} />
        <AvailableEmployeesGrid weekDates={weekDates} availabilities={schedule.availabilities} />
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Schedule);
