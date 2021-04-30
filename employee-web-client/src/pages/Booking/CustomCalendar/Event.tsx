import React from 'react';
import { chakra, GridItem, HStack, Text, VStack } from '@chakra-ui/react';
import { Button } from '../../../shared/Button';
import { FormattedDate } from '../../../shared/Date';
import { IBookedRecord } from '../../../modules/booking/application/types';

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
          <Button colorScheme='primary' opacity={0.7} w='100%' h='100%'>
            <VStack spacing={1} w='100%' align='flex-start'>
              <chakra.p fontWeight='700'>{record.offerName}</chakra.p>
              <HStack fontSize='sm'>
                <FormattedDate value={record.dateFrom} format='HH:mm' />
                <Text> - </Text>
                <FormattedDate value={record.dateTo} format='HH:mm' />
              </HStack>
            </VStack>
          </Button>
        </HStack>
      </HStack>
    </GridItem>
  );
};

export { Event };
