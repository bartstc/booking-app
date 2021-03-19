import React, { useState } from 'react';
import { Box, Flex, HStack, Text, VStack, Divider } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Currency } from 'types';

import { TreeCounter } from 'shared/TreeCounter';
import { ResponsiveRemoveButton } from 'shared/Buttons';
import { Button } from 'shared/Button';
import { Money } from 'shared/Money';

import { OfferSelectFieldAsync } from '../../../../offers/shared';
import { useFacilityConsumer } from '../../../../context';
import { IAddBookingDto } from '../../../dto';
import { IOffer } from '../../../../offers/types';
import { SelectDateModal } from './SelectDateModal';
import { InputField } from '../../../../../shared/Form';

const BookedRecordFields = () => {
  const { facilityId } = useFacilityConsumer();

  // todo: handle by facility configuration
  const currency = Currency.Pln;

  const [selectedOffers, setSelectedOffers] = useState<{ fieldId: string; offer: IOffer }[]>([]);

  const { control, watch, getValues } = useFormContext<IAddBookingDto>();
  const { fields, append, remove } = useFieldArray({ control, name: 'bookedRecords' });

  const total = Money.total(selectedOffers.map(({ offer }) => Money.from(Number(offer.price.value), offer.price.currency)));
  const customerId = watch('customerId');

  const bookedRecords = getValues().bookedRecords;
  const isMany = bookedRecords && bookedRecords.length > 1;
  const lastRecordIsSet = bookedRecords ? Object.values(bookedRecords[bookedRecords.length - 1]).every(value => !!value) : false;

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;

        return (
          <Flex key={field.id} w='100%'>
            {fields.length > 1 && <TreeCounter index={index} fieldsCount={fields.length} />}
            <VStack spacing={2} w='100%' align='stretch' pb={8}>
              {isMany && <Divider pt={2} />}
              <HStack justify='space-between'>
                <Box w='100%'>
                  <OfferSelectFieldAsync
                    onChangeEffect={option => {
                      if (option) {
                        setSelectedOffers(offers => [...offers, { fieldId: field.id!, offer: option.offer }]);
                      } else {
                        setSelectedOffers(offers => offers.filter(offer => offer.fieldId !== field.id!));
                      }
                    }}
                    currency={currency}
                    facilityId={facilityId}
                    name={`bookedRecords[${index}].offerId`}
                    id={`bookedRecords[${index}].offerId`}
                    disabled={!customerId}
                  />
                </Box>
                {!isFirst && (
                  <ResponsiveRemoveButton
                    onClick={() => {
                      setSelectedOffers(offers => offers.filter(offer => offer.fieldId !== field.id!));
                      remove(index);
                    }}
                    mt='16px !important'
                  />
                )}
              </HStack>
              <Box display='none'>
                <InputField label='' name={`bookedRecords[${index}].employeeId`} id={`bookedRecords[${index}].employeeId`} />
                <InputField label='' name={`bookedRecords[${index}].date`} id={`bookedRecords[${index}].date`} />
              </Box>
              <Box w='100%'>
                <SelectDateModal offerId={watch(`bookedRecords[${index}].offerId`)} index={index} />
              </Box>
            </VStack>
          </Flex>
        );
      })}
      <Button disabled={!lastRecordIsSet} colorScheme='blue' onClick={() => append({ employerId: '', offerId: '', dateFrom: '' })}>
        <FormattedMessage id='add-another-offer' defaultMessage='Add another offer' />
      </Button>
      <Box pt={6} w='100%'>
        <Divider mb={3} />
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
      </Box>
    </VStack>
  );
};

export { BookedRecordFields };
