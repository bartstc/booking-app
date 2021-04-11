import React from 'react';
import { Flex, Heading, Text, VStack, chakra, HStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { ISchedule } from 'modules/schedules/application/types';
import { FormattedDate } from 'shared/Date';

interface IProps {
  schedule: ISchedule;
}

const Header = ({ schedule }: IProps) => {
  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          {schedule.name}
        </Heading>
        <HStack as='h2' lineHeight={4}>
          <Text>
            <FormattedMessage
              id='start-date-value'
              defaultMessage='Start date: {date}'
              values={{
                date: (
                  <chakra.b ml={1} display='inline-block'>
                    <FormattedDate value={schedule.startDate} />
                  </chakra.b>
                ),
              }}
            />
          </Text>
          <Text>-</Text>
          <Text>
            <FormattedMessage
              id='end-date-value'
              defaultMessage='End date: {date}'
              values={{
                date: (
                  <chakra.b ml={1} display='inline-block'>
                    <FormattedDate value={schedule.endDate} />
                  </chakra.b>
                ),
              }}
            />
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export { Header };
