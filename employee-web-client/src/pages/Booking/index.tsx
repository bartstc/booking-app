import React, { useEffect } from 'react';
import { Box, HStack, useColorModeValue, VStack } from '@chakra-ui/react';
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
import { WeekDaysGrid, WorkingDaysGrid } from 'shared/Calendar';

import { Header } from './Header';

const Booking = () => {
  const { set, params } = useQueryParams<{ startTime: string; endTime: string }>();

  const color = useColorModeValue('primary.500', 'primary.300');
  const weekTextColor = useColorModeValue('gray.500', 'gray.400');

  const { workingDays } = useFacilityConsumer();

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
    startDate: params.startTime ? dayjs(params.startTime) : undefined,
    minDate: dayjs(),
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
      <Header />

      <VStack w='100%' spacing={0}>
        <VStack spacing={-1}>
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
        </VStack>
        <WeekDaysGrid weekDates={weekDates} />
        <WorkingDaysGrid workingDays={workingDays} />
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Booking);
