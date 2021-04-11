import React from 'react';
import { Dayjs } from 'dayjs';
import { Box, Center, SimpleGrid, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';

import { FormattedDate } from 'shared/Date';

interface IProps {
  weekDates: Dayjs[];
}

const WeekDaysGrid = ({ weekDates }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  return (
    <SimpleGrid w='100%' spacingX={0} columns={8}>
      <Box border={`1px solid ${borderColor}`} minH='65px'></Box>
      {weekDates.map((date, index) => (
        <VStack justify='center' minH='65px' key={index} border={`1px solid ${borderColor}`} borderLeft='none' textTransform='capitalize'>
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
  );
};

export { WeekDaysGrid };
