import React from 'react';
import { Center, SimpleGrid, VStack, useColorModeValue, useTheme } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';

import { IAvailableEmployee } from 'modules/schedules/application/types';
import { useEmployeesQuery } from 'modules/employees/infrastructure/query';
import { useFacilityConsumer } from 'modules/context';

import { AvailableEmployeePopover } from './AvailableEmployeePopover';
import { EmptyEmployeePopover } from './EmptyEmployeePopover';

interface IProps {
  weekDates: Dayjs[];
  availabilities: IAvailableEmployee[];
}

const AvailableEmployeesGrid = ({ availabilities, weekDates }: IProps) => {
  const { facilityId } = useFacilityConsumer();
  const { collection } = useEmployeesQuery(facilityId);

  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const dayOffBackgroundColor = useColorModeValue(colors.gray[100], colors.gray[700]);
  const dayOffBorder = useColorModeValue(colors.gray[300], colors.gray[600]);
  const dayOffBackground = `repeating-linear-gradient(-45deg, ${dayOffBorder}, ${dayOffBorder} 1px, ${dayOffBackgroundColor} 2px, ${dayOffBackgroundColor} 9px)`;

  return (
    <>
      {collection.map(employee => {
        const employeeAvailabilities = availabilities.filter(availability => availability.employeeId === employee.employeeId);

        return (
          <SimpleGrid key={employee.employeeId} w='100%' spacingX={0} columns={8}>
            <Center fontWeight='700' border={`1px solid ${borderColor}`} borderTop='none'>
              {employee.name}
            </Center>
            {weekDates.map((weekDate, index) => {
              const availabilities = employeeAvailabilities.filter(
                employee => dayjs(employee.startTime).format('D-M') === weekDate.format('D-M'),
              );

              return (
                <VStack
                  justify={'flex-start'}
                  minH='65px'
                  p={2}
                  pb={1}
                  key={index}
                  border={`1px solid ${borderColor}`}
                  background={availabilities.length === 0 ? dayOffBackground : 'transparent'}
                  borderLeft='none'
                  borderTop='none'
                  textTransform='capitalize'
                  spacing={1}
                >
                  {availabilities.length === 0 ? (
                    <>
                      <EmptyEmployeePopover date={weekDate.toDate().toString()} employeeId={employee.employeeId} index={0} />
                    </>
                  ) : (
                    <>
                      {availabilities.map((availability, index) => (
                        <AvailableEmployeePopover
                          key={index}
                          index={index}
                          date={weekDate.toDate().toString()}
                          availabilities={availabilities}
                          availability={availability}
                        />
                      ))}
                    </>
                  )}
                </VStack>
              );
            })}
          </SimpleGrid>
        );
      })}
    </>
  );
};

export { AvailableEmployeesGrid };
