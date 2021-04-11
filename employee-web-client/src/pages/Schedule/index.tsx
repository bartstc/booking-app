import React from 'react';
import dayjs from 'dayjs';
import { VStack, SimpleGrid, Box, Center, Text, useColorModeValue, useTheme, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';

import { useWeekRange } from 'hooks';

import { useScheduleQuery } from 'modules/schedules/infrastructure/query/scheduleQuery';
import { WeekDay } from 'modules/facility/application/types';
import { useFacilityConsumer } from 'modules/context';

import { PageWrapper } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { FormattedDate } from 'shared/Date';
import { IconButton } from 'shared/Button';

import { Header } from './Header';

const weekDays = [WeekDay.Sunday, WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday, WeekDay.Saturday];

const Schedule = () => {
  const { formatMessage } = useIntl();
  const { facilityId, workingDays } = useFacilityConsumer();
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const schedule = useScheduleQuery(facilityId, scheduleId);
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
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
          <HStack>
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
        <SimpleGrid w='100%' spacingX={0} columns={8}>
          <Box border={`1px solid ${borderColor}`} minH='65px'></Box>
          {weekDates.map((date, index) => (
            <VStack
              justify='center'
              minH='65px'
              key={index}
              border={`1px solid ${borderColor}`}
              borderLeft='none'
              textTransform='capitalize'
            >
              <Center as={VStack} spacing={0}>
                <Box fontWeight='700'>
                  <FormattedDate value={date.toDate().toString()} format={'ddd'} />
                </Box>
                <Box fontSize='sm'>
                  <FormattedDate value={date.toDate().toString()} format={'DD MMM'} />
                </Box>
              </Center>
            </VStack>
          ))}
        </SimpleGrid>
        <SimpleGrid w='100%' spacingX={0} columns={8}>
          <Center fontWeight='700' border={`1px solid ${borderColor}`} borderTop='none'>
            <FormattedMessage id='working-hours' defaultMessage='Working Hours' />
          </Center>
          {weekDays.map(day => {
            const hours = workingDays.find(workingDay => workingDay.dayName === day)?.hours[0];

            return (
              <VStack
                justify='center'
                minH='65px'
                key={day}
                border={`1px solid ${borderColor}`}
                backgroundColor={!hours ? borderColor : 'transparent'}
                borderLeft='none'
                borderTop='none'
                textTransform='capitalize'
              >
                {!hours ? (
                  <FormattedMessage id='closed' defaultMessage='Closed' />
                ) : (
                  <Text>
                    {hours.until} - {hours.to}
                  </Text>
                )}
              </VStack>
            );
          })}
        </SimpleGrid>
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Schedule);
