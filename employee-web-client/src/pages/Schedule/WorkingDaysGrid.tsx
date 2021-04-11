import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Center, SimpleGrid, Text, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';

import { IWorkingDay, WeekDay } from 'modules/facility/application/types';

const weekDays = [WeekDay.Sunday, WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday, WeekDay.Saturday];

interface IProps {
  workingDays: IWorkingDay[];
}

const WorkingDaysGrid = ({ workingDays }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const dayOffBackgroundColor = useColorModeValue(colors.gray[100], colors.gray[700]);
  const dayOffBorder = useColorModeValue(colors.gray[300], colors.gray[600]);
  const dayOffBackground = `repeating-linear-gradient(-45deg, ${dayOffBorder}, ${dayOffBorder} 1px, ${dayOffBackgroundColor} 2px, ${dayOffBackgroundColor} 9px)`;

  return (
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
            background={!hours ? dayOffBackground : 'transparent'}
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
  );
};

export { WorkingDaysGrid };
