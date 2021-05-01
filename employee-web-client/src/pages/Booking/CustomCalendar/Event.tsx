import React from 'react';
import { GridItem, HStack } from '@chakra-ui/react';

import { IBookedRecord } from 'modules/booking/application/types';
import { EventPopover } from './EventPopover';

interface IProps {
  record: IBookedRecord;
}

const Event = ({ record }: IProps) => {
  const gridPitch = 5;
  const rows = (new Date(record.dateFrom).getMinutes() + new Date(record.dateFrom).getHours() * 60) / gridPitch;

  return (
    <GridItem key={record.bookedRecordId} rowStart={rows + 1} rowEnd={rows + record.duration / gridPitch + 1} position='relative'>
      <HStack top={1} left={1} right={1} bottom={1} position='absolute'>
        <HStack opacity={1} w='100%' h='100%'>
          <EventPopover record={record} />
        </HStack>
      </HStack>
    </GridItem>
  );
};

export { Event };
