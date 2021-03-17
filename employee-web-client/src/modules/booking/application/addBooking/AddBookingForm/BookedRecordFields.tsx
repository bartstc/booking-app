import React, { useState } from 'react';
import { Box, Flex, HStack, Text, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';
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

const BookedRecordFields = () => {
  const { facilityId } = useFacilityConsumer();

  // todo: handle by facility configuration
  const currency = Currency.Pln;

  const [selectedOffers, setSelectedOffers] = useState<{ fieldId: string; offer: IOffer }[]>([]);

  const { control, watch, register } = useFormContext<IAddBookingDto>();
  const { fields, append, remove } = useFieldArray({ control, name: 'bookedRecords' });

  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  const total = Money.total(selectedOffers.map(({ offer }) => Money.from(Number(offer.price.value), offer.price.currency)));
  const customerId = watch('customerId');

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;
        register(`bookedRecords[${index}].employeeId`);
        register(`bookedRecords[${index}].date`);

        return (
          <Flex key={field.id} w='100%'>
            {fields.length > 1 && <TreeCounter index={index} fieldsCount={fields.length} />}
            <VStack py={4} borderTop={`1px solid ${borderColor}`} spacing={2} w='100%' align='stretch' mb={4}>
              <HStack justify='space-between'>
                <Box w='100%' maxW='600px'>
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
              <Box w='100%'>
                <SelectDateModal offerId={watch(`bookedRecords[${index}].offerId`)} index={index} />
              </Box>
            </VStack>
          </Flex>
        );
      })}
      <Button colorScheme='blue' onClick={() => append({ employerId: '', offerId: '', dateFrom: '' })}>
        <FormattedMessage id='add-another-offer' defaultMessage='Add another offer' />
      </Button>
      <Text pt={2} fontSize={{ base: 'md', md: 'lg' }}>
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
    </VStack>
  );
};

export { BookedRecordFields };
