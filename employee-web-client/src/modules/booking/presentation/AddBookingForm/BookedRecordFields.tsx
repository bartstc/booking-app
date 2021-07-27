import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, VStack, chakra, useColorModeValue, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InputField } from 'react-hook-form-chakra-fields';

import { ResponsiveRemoveButton } from 'shared/Buttons';
import { Money } from 'shared/Money';
import { FormattedDate } from 'shared/Date';
import { SectionGrid, SectionHeader, SectionSubtitle, SectionTitle } from 'shared/ReadMode';

import { useFacilityContextSelector } from '../../../context';
import { IAddBookingDto } from '../../application/types';
import { SelectDateModal } from './SelectDateModal';
import { IOffer } from '../../../offers/application/types';
import { OfferSelectFieldAsync } from '../../../offers/presentation';
import { Summary } from './Summary';

const BookedRecordFields = () => {
  const facilityId = useFacilityContextSelector(state => state.facilityId);
  const currency = useFacilityContextSelector(state => state.currency);
  const color = useColorModeValue('primary.500', 'primary.300');
  const [selectedOffers, setSelectedOffers] = useState<{ fieldId: string; offer: IOffer }[]>([]);

  const { control, watch, setValue } = useFormContext<IAddBookingDto>();
  const { fields, append, remove } = useFieldArray({ control, name: 'bookedRecords' });

  const customerId = watch('customerId');

  useEffect(() => {
    if (customerId) {
      setSelectedOffers([]);
    }
  }, [customerId, setSelectedOffers]);

  const total = Money.total(selectedOffers.map(({ offer }) => Money.from(Number(offer.price.value), offer.price.currency)));

  return (
    <>
      {fields.map((field, index) => {
        const offerIdName = `bookedRecords[${index}].offerId`;
        const employeeIdName = `bookedRecords[${index}].employeeId`;
        const dateName = `bookedRecords[${index}].date`;

        const isFirst = index === 0;
        const isFilled = !!watch(dateName);

        return (
          <SectionGrid key={field.id}>
            <GridItem colSpan={{ base: 3, lg: 1 }}>
              <SectionHeader>
                <SectionTitle>
                  {index === 0 ? (
                    <FormattedMessage id='specify-booking' defaultMessage='Book your visit' />
                  ) : (
                    <FormattedMessage id='book-another-visit' defaultMessage='Book another visit' />
                  )}
                </SectionTitle>
                <SectionSubtitle>
                  <FormattedMessage
                    id='specify-booking-description'
                    defaultMessage='Choose the offer that interests you, the date and the employee.'
                  />
                </SectionSubtitle>
              </SectionHeader>
            </GridItem>
            <GridItem colSpan={{ base: 3, lg: 2 }}>
              <VStack spacing={2} w='100%' align='stretch' pb={8}>
                <HStack align='flex-start' justify='space-between'>
                  <Box w='100%' maxW='600px'>
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
            </GridItem>
          </SectionGrid>
        );
      })}
      <Summary total={total} append={append} />
    </>
  );
};

export { BookedRecordFields };
