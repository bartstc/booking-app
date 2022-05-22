import React from 'react';
import { Text, chakra, HStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { ISchedule } from 'modules/schedules/application/types';
import { FormattedDate } from 'shared/Date';
import { PageDescription, PageHeader, PageHeading } from 'shared/Layout';

interface IProps {
  schedule: ISchedule;
}

const Header = ({ schedule }: IProps) => {
  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>{schedule.name}</PageHeading>
        <HStack as='h2' lineHeight={4}>
          <Text>
            <FormattedMessage
              id='start-date-value'
              defaultMessage='Start date: {date}'
              values={{
                date: (
                  <chakra.b ml={1} display='inline-block'>
                    <FormattedDate value={schedule.startDate} format='DD MMM YYYY' />
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
                    <FormattedDate value={schedule.endDate} format='DD MMM YYYY' />
                  </chakra.b>
                ),
              }}
            />
          </Text>
        </HStack>
      </PageDescription>
    </PageHeader>
  );
};

export { Header };
