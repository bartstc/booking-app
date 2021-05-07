import React from 'react';
import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { mdiFileDocument } from '@mdi/js';
import { useFormContext } from 'react-hook-form';

import { Button } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { IAddBookingDto } from '../../application/types';
import { useFacilityConsumer } from '../../../context';

interface IProps {
  total: number;
  append: (values: Record<string, unknown>) => void;
}

const Summary = ({ total, append }: IProps) => {
  const { currency } = useFacilityConsumer();
  const { getValues } = useFormContext<IAddBookingDto>();

  const bookedRecords = getValues().bookedRecords;
  const lastRecordIsSet = bookedRecords ? Object.values(bookedRecords[bookedRecords.length - 1]).every(value => value) : false;

  return (
    <VStack pt={3} w='100%' align='stretch'>
      <Divider mb={2} />
      <HStack align='flex-start' justify='space-between'>
        <Text fontSize={{ base: 'md', md: 'lg' }}>
          <FormattedMessage id='total' defaultMessage='Total' />
          {': '}
          {total > 0 ? (
            <b>
              {total} {currency.toUpperCase()}
            </b>
          ) : (
            <b>---</b>
          )}
        </Text>
        {lastRecordIsSet && (
          <Button
            leftIcon={<Icon path={mdiFileDocument} size='16px' />}
            colorScheme='primary'
            onClick={() => append({ employerId: '', offerId: '', dateFrom: '' })}
            size='sm'
          >
            <FormattedMessage id='add-another-offer' defaultMessage='Add another offer' />
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export { Summary };
