import React, { useEffect } from 'react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { FormattedMessage } from 'react-intl';
import { Box, Center, chakra, GridItem, HStack, SimpleGrid, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';

import { dayjs } from 'utils/dayjs';
import { useWeekRange } from 'hooks';

import { useQueryParams } from 'shared/Params';
import { IconButton } from 'shared/Button';
import { FormattedDate } from 'shared/Date';
import { WeekDaysGrid } from 'shared/Calendar';

import { useFacilityContextSelector } from 'modules/context';
import { useBookedRecordsQuery } from 'modules/booking/infrastructure/query';

import { BookingPageQueryParams } from '../index';
import { BookingDatePicker } from '../BookingDatePicker';
import { EmployeeSelect } from '../EmployeeSelect';
import { Event } from './Event';

const CustomCalendar = () => {
  const { set, params } = useQueryParams<BookingPageQueryParams>();
  const { colors } = useTheme();

  const color = useColorModeValue('primary.500', 'primary.300');
  const weekTextColor = useColorModeValue('gray.500', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  const facilityId = useFacilityContextSelector(state => state.facilityId);
  const enterpriseId = useFacilityContextSelector(state => state.enterpriseId);

  const { saturday, sunday, trackedDay, weekDates, nextWeek, prevWeek, setWeek, isPrevWeekNotAllowed, isNextWeekNotAllowed } = useWeekRange(
    {
      startDate: params.dateFrom ? dayjs(params.dateFrom) : undefined,
      minDate: dayjs(),
    },
  );

  const dateFrom = sunday.format('YYYY-MM-DDT00:00:00.000');
  const dateTo = saturday.format('YYYY-MM-DDT23:59:59.000');

  useEffect(() => {
    set({
      ...params,
      dateFrom,
      dateTo,
    });
  }, [dateTo, dateFrom]);

  const bookedRecords = useBookedRecordsQuery(facilityId, { dateTo, dateFrom });

  return (
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
          <EmployeeSelect enterpriseId={enterpriseId} />
        </GridItem>
      </SimpleGrid>
      <SimpleGrid columns={15} w='100%' pr={4}>
        <GridItem colStart={2} colEnd={16}>
          <WeekDaysGrid weekDates={weekDates} ignoreFirst />
        </GridItem>
      </SimpleGrid>
      <SimpleGrid
        mt='35px !important'
        pt='15px !important'
        position='relative'
        overflowY='scroll'
        w='100%'
        maxH='560px'
        spacingX={0}
        columns={15}
      >
        <GridItem colSpan={1}>
          <SimpleGrid h='2400px' rows={288} columns={1}>
            {Array.from(Array(24).keys()).map(value => (
              <GridItem key={value} rowSpan={12}>
                <chakra.p fontWeight='700' mt={-3}>
                  {value < 10 ? `0${value}` : value}:00
                </chakra.p>
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
        {weekDates.map((day, index) => {
          const dayRecords = bookedRecords.filter(record => dayjs(record.dateFrom).format('D-M') === day.format('D-M'));

          return (
            <GridItem position='relative' colSpan={2} key={index} borderLeft={`1px dashed ${borderColor}`}>
              <SimpleGrid position='absolute' w='100%' h='2400px' rows={288}>
                {dayRecords.map(record => (
                  <Event key={record.bookedRecordId} record={record} />
                ))}
                <GridItem rowStart={289} rowEnd={289}></GridItem>
              </SimpleGrid>
              <SimpleGrid w='100%' h='2390px' rows={24} columns={1}>
                {Array.from(Array(24).keys()).map((value, index) => (
                  <GridItem as={Center} key={value} rowStart={index + 1} rowEnd={index + 2} borderTop={`1px dashed ${borderColor}`} />
                ))}
              </SimpleGrid>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export { CustomCalendar };
