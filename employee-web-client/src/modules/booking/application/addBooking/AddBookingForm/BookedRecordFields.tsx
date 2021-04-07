import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, VStack, Divider, chakra, useColorModeValue } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InputField } from 'react-hook-form-chakra-fields';

import { TreeCounter } from 'shared/TreeCounter';
import { ResponsiveRemoveButton } from 'shared/Buttons';
import { Money } from 'shared/Money';
import { FormattedDate } from 'shared/Date';

import { useFacilityConsumer } from '../../../../context';
import { IAddBookingDto } from '../../../dto';
import { SelectDateModal } from './SelectDateModal';
import { Summary } from './Summary';
import { IOffer } from '../../../../offers/application/types';
import { OfferSelectFieldAsync } from '../../../../offersShared/presentation';

const BookedRecordFields = () => {
  const { facilityId, currency } = useFacilityConsumer();
  const color = useColorModeValue('primary.500', 'primary.300');
  const [selectedOffers, setSelectedOffers] = useState<{ fieldId: string; offer: IOffer }[]>([]);

  const { control, watch, getValues, setValue } = useFormContext<IAddBookingDto>();
  const { fields, append, remove } = useFieldArray({ control, name: 'bookedRecords' });

  const customerId = watch('customerId');
  const bookedRecords = getValues().bookedRecords;
  const isMany = bookedRecords && bookedRecords.length > 1;

  useEffect(() => {
    if (customerId) {
      setSelectedOffers([]);
    }
  }, [customerId, setSelectedOffers]);

  const total = Money.total(selectedOffers.map(({ offer }) => Money.from(Number(offer.price.value), offer.price.currency)));

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const offerIdName = `bookedRecords[${index}].offerId`;
        const employeeIdName = `bookedRecords[${index}].employeeId`;
        const dateName = `bookedRecords[${index}].date`;

        const isFirst = index === 0;
        const isFilled = !!watch(dateName);

        return (
          <Flex key={field.id} w='100%'>
            {fields.length > 1 && <TreeCounter index={index} fieldsCount={fields.length} />}
            <VStack spacing={2} w='100%' align='stretch' pb={8}>
              {isMany && <Divider pt={2} />}
              <HStack align='flex-start' justify='space-between'>
                <Box w='100%'>
                  <OfferSelectFieldAsync
                    onChangeEffect={option => {
                      if (Array.isArray(option)) return;

                      if (!option) {
                        setSelectedOffers(offers => offers.filter(offer => offer.fieldId !== field.id!));
                        return;
                      }

                      const offerId = watch(offerIdName);

                      if (!offerId && option) {
                        setSelectedOffers(offers => [...offers, { fieldId: field.id!, offer: option.offer }]);
                        return;
                      }

                      if (offerId && offerId === option.value) {
                        return;
                      }

                      if (option.value !== offerId) {
                        setValue(employeeIdName, '');
                        setValue(dateName, '');
                        setSelectedOffers(offers => offers.filter(offer => offer.fieldId !== field.id!));
                        setSelectedOffers(offers => [...offers, { fieldId: field.id!, offer: option.offer }]);
                      }
                    }}
                    currency={currency}
                    facilityId={facilityId}
                    name={offerIdName}
                    id={offerIdName}
                    disabled={!customerId}
                    helperText={
                      !watch(offerIdName) ? undefined : (
                        <FormattedMessage
                          id='offer-change-affects-data'
                          defaultMessage='Change of the offer will affect selected employee and time.'
                        />
                      )
                    }
                  />
                </Box>
                {!isFirst && (
                  <ResponsiveRemoveButton
                    onClick={() => {
                      setSelectedOffers(offers => offers.filter(offer => offer.fieldId !== field.id!));
                      remove(index);
                    }}
                    mt='30px !important'
                  />
                )}
              </HStack>
              <Box display='none'>
                <InputField label='' name={employeeIdName} id={employeeIdName} />
                <InputField label='' name={dateName} id={dateName} />
              </Box>
              <VStack spacing={3}>
                {isFilled && (
                  <VStack w='100%' align='flex-start' justify='space-between'>
                    <Flex>
                      <FormattedMessage
                        id='selected-date'
                        defaultMessage='Date: {date}'
                        values={{
                          date: (
                            <chakra.b ml={1} color={color}>
                              <FormattedDate value={watch(dateName)} format={'ddd DD MMM HH:mm'} />
                            </chakra.b>
                          ),
                        }}
                      />
                    </Flex>
                  </VStack>
                )}
                <Box w='100%'>
                  <SelectDateModal offerId={watch(offerIdName)} index={index} isFilled={isFilled} />
                </Box>
              </VStack>
            </VStack>
          </Flex>
        );
      })}
      <Summary total={total} append={append} />
    </VStack>
  );
};

export { BookedRecordFields };
