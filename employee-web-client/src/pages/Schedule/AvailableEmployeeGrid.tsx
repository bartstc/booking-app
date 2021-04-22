import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Center,
  SimpleGrid,
  GridItem,
  StackProps,
  useColorModeValue,
  useTheme,
  VStack,
  AvatarBadge,
  HStack,
} from '@chakra-ui/react';
import { Dayjs } from 'dayjs';

import { dayjs } from 'utils/dayjs';

import { EmployeeStatus } from 'modules/employees/application/types';
import { useAvailabilitiesQuery } from 'modules/schedules/infrastructure/query';
import { useRangeWeekDatesConsumer } from 'modules/schedules/presentation';
import { useEmployeesQuery } from 'modules/employees/infrastructure/query';
import { useFacilityConsumer } from 'modules/context';
import { useFreeWeekDays } from 'modules/schedules/application';

import { AvailableEmployeePopover } from './AvailableEmployeePopover';
import { EmptyEmployeePopover } from './EmptyEmployeePopover';

interface IProps {
  weekDates: Dayjs[];
  isInRange: (date: Dayjs) => boolean;
}

const AvailableEmployeeGrid = ({ weekDates, isInRange }: IProps) => {
  const params = useParams<{ scheduleId: string }>();
  const { facilityId, workingDays } = useFacilityConsumer();
  const { endTime, startTime } = useRangeWeekDatesConsumer();
  const freeWeekDaysIndexes = useFreeWeekDays(workingDays);

  const { collection: employees } = useEmployeesQuery(facilityId);
  const { collection: availabilities } = useAvailabilitiesQuery(facilityId, params.scheduleId, { endTime, startTime });

  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const blockedBackgroundColor = useColorModeValue(colors.gray[100], colors.gray[700]);
  const dayOffBorder = useColorModeValue(colors.gray[300], colors.gray[600]);
  const blockedBackground = `repeating-linear-gradient(-45deg, ${dayOffBorder}, ${dayOffBorder} 1px, ${blockedBackgroundColor} 2px, ${blockedBackgroundColor} 9px)`;
  const avatarBg = useColorModeValue('gray.300', 'gray.600');

  return (
    <>
      {employees.map(employee => {
        const employeeAvailabilities = availabilities.filter(availability => availability.employeeId === employee.employeeId);

        return (
          <SimpleGrid key={employee.employeeId} w='100%' spacingX={0} columns={8}>
            <GridItem
              as={Center}
              colSpan={1}
              justifyContent='flex-start'
              fontWeight='700'
              p={2}
              border={`1px solid ${borderColor}`}
              borderTop='none'
            >
              <HStack spacing={3}>
                <Avatar bg={avatarBg} size='sm'>
                  <AvatarBadge boxSize='1.1em' bg={employee.status === EmployeeStatus.Active ? 'green.300' : 'red.300'} />
                </Avatar>
                <VStack align='flex-start' spacing={1}>
                  <Box lineHeight='.9rem' fontSize='sm'>
                    {employee.name}
                  </Box>
                  <Box fontSize='xs' color='gray.500'>
                    {employee.position}
                  </Box>
                </VStack>
              </HStack>
            </GridItem>
            {weekDates.map((weekDate, index) => {
              const availabilities = employeeAvailabilities.filter(
                employee => dayjs(employee.startTime).format('D-M') === weekDate.format('D-M'),
              );

              const isOutOfSchedule = !isInRange(weekDate);
              const isFreeWeekDay = freeWeekDaysIndexes.includes(weekDate.weekday());

              if (isOutOfSchedule || isFreeWeekDay) {
                return <Cell key={index} background={blockedBackground} />;
              }

              if (availabilities.length === 0) {
                return (
                  <Cell key={index}>
                    <EmptyEmployeePopover dayDate={weekDate} employeeId={employee.employeeId} index={0} scheduleId={params.scheduleId} />
                  </Cell>
                );
              }

              return (
                <Cell key={index}>
                  {availabilities.map((availability, index) => (
                    <AvailableEmployeePopover
                      key={index}
                      index={index}
                      scheduleId={params.scheduleId}
                      employeeId={employee.employeeId}
                      dayDate={weekDate}
                      availabilities={availabilities}
                    />
                  ))}
                </Cell>
              );
            })}
          </SimpleGrid>
        );
      })}
    </>
  );
};

const Cell = ({ children, ...props }: StackProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  return (
    <GridItem
      as={VStack}
      colSpan={1}
      justify='flex-start'
      minH='65px'
      p={2}
      border={`1px solid ${borderColor}`}
      borderLeft='none'
      borderTop='none'
      textTransform='capitalize'
      spacing={1}
      {...props}
    >
      {children}
    </GridItem>
  );
};

export { AvailableEmployeeGrid };
