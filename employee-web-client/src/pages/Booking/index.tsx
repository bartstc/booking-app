import React, { useEffect } from 'react';
import { Box, SimpleGrid, useColorModeValue, VStack, HStack, useTheme, GridItem, Center, chakra } from '@chakra-ui/react';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { FormattedMessage } from 'react-intl';

import { PageWrapper } from 'shared/Layout/Page';

import { useWeekRange } from 'hooks';
import { dayjs } from 'utils/dayjs';

import { Button, IconButton } from 'shared/Button';
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

  const gridPitch = 5;
  const rowHeight = 6;

  return (
    <PageWrapper maxW='1600px' spacing={4}>
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
        <SimpleGrid columns={15} w='100%' pr={4}>
          <GridItem colStart={2} colEnd={16}>
            <WeekDaysGrid weekDates={weekDates} ignoreFirst />
          </GridItem>
        </SimpleGrid>
        {/*<SimpleGrid w='100%' spacingX={0} columns={15}>*/}
        {/*  <HStack*/}
        {/*    as={GridItem}*/}
        {/*    colSpan={1}*/}
        {/*    fontSize='sm'*/}
        {/*    justify='center'*/}
        {/*    minH='32px'*/}
        {/*    border={`1px solid ${borderColor}`}*/}
        {/*    borderTop='none'*/}
        {/*  ></HStack>*/}
        {/*  {weekDates.map((day, index) => {*/}
        {/*    const dayRecords = bookedRecords.filter(record => dayjs(record.dateFrom).format('D-M') === day.format('D-M'));*/}

        {/*    return (*/}
        {/*      <HStack*/}
        {/*        as={GridItem}*/}
        {/*        colSpan={2}*/}
        {/*        fontSize='sm'*/}
        {/*        justify='center'*/}
        {/*        minH='32px'*/}
        {/*        key={index}*/}
        {/*        border={`1px solid ${borderColor}`}*/}
        {/*        borderTop='none'*/}
        {/*      >*/}
        {/*        <FormattedMessage*/}
        {/*          id='reservations-count'*/}
        {/*          defaultMessage='Reservations: {amount}'*/}
        {/*          values={{*/}
        {/*            amount: dayRecords.length,*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </HStack>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</SimpleGrid>*/}
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
                  {/*<GridItem rowStart={1} rowEnd={13} backgroundColor='green.500'></GridItem>*/}
                  {/*<GridItem rowStart={13} rowEnd={25} backgroundColor='blue.500'></GridItem>*/}
                  {/*<GridItem rowStart={25} rowEnd={49} backgroundColor='purple.500'></GridItem>*/}
                  {/*<GridItem mt='3px' position='relative' rowStart={49} rowEnd={49 + 12} backgroundColor='orange.500'>*/}
                  {/*  <HStack position='absolute' top={0} left={0} w='100%' h='100%'>*/}
                  {/*    <p>test</p>*/}
                  {/*  </HStack>*/}
                  {/*</GridItem>*/}
                  {dayRecords.map(record => {
                    const rows = (new Date(record.dateFrom).getMinutes() + new Date(record.dateFrom).getHours() * 60) / gridPitch;

                    return (
                      <GridItem
                        key={record.bookedRecordId}
                        rowStart={rows + 1}
                        rowEnd={rows + record.duration / gridPitch + 1}
                        position='relative'
                      >
                        <HStack position='absolute' top={0} left={0} w='100%' h='100%' opacity={0.65} backgroundColor='yellow.500'></HStack>
                        <HStack borderRadius={6} top={0} left={0} w='100%' h='100%' position='absolute'>
                          <HStack opacity={1}>
                            <Button>Testowy</Button>
                          </HStack>
                        </HStack>
                      </GridItem>
                    );
                  })}
                  {/*<GridItem m={1} borderRadius={3} backgroundColor='blue.400' rowStart={100} rowEnd={112}>*/}
                  {/*  test*/}
                  {/*</GridItem>*/}
                  {/*<GridItem m={1} borderRadius={3} backgroundColor='blue.400' rowStart={205} rowEnd={210}>*/}
                  {/*  test 2*/}
                  {/*</GridItem>*/}
                  <GridItem rowStart={289} rowEnd={289}></GridItem>
                </SimpleGrid>
                <SimpleGrid w='100%' h='2389px' rows={24} columns={1}>
                  {Array.from(Array(24).keys()).map((value, index) => (
                    <GridItem
                      as={Center}
                      key={value}
                      rowStart={index + 1}
                      rowEnd={index + 2}
                      borderTop={`1px dashed ${borderColor}`}
                    ></GridItem>
                  ))}
                </SimpleGrid>
              </GridItem>
            );
          })}
        </SimpleGrid>
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Booking);
