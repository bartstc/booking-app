import React from 'react';
import { useNavigate } from 'react-router-dom';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { FormattedDate } from 'shared/Date';

import { ISchedule } from '../../../application/types';

interface IProps {
  schedule: ISchedule;
}

const Row = ({ schedule }: IProps) => {
  const navigate = useNavigate();

  return (
    <GridItem onClick={() => navigate(`/schedules/${schedule.scheduleId}`)}>
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
