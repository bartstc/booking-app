import React from 'react';
import { useHistory } from 'react-router-dom';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { FormattedDate } from 'shared/Date';

import { ISchedule } from '../../../application/types';

interface IProps {
  schedule: ISchedule;
}

const Row = ({ schedule }: IProps) => {
  const { push } = useHistory();

  return (
    <GridItem id={schedule.scheduleId} onClick={() => push(`/schedules/${schedule.scheduleId}`)}>
      <TruncatedCell>{schedule.name}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>
        <FormattedDate value={schedule.startDate} format='DD MMM YYYY' />
      </TruncatedCell>
      <TruncatedCell>
        <FormattedDate value={schedule.endDate} format='DD MMM YYYY' />
      </TruncatedCell>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>
        <FormattedDate value={schedule.creationDate} format='DD MMM YYYY' />
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };
