import React, { useState } from 'react';
import { Box, Flex, HStack, Text, VStack, Divider, chakra, useColorModeValue } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiFileDocument } from '@mdi/js';

import { Currency } from 'types';

import { TreeCounter } from 'shared/TreeCounter';
import { ResponsiveRemoveButton } from 'shared/Buttons';
import { Button } from 'shared/Button';
import { Money } from 'shared/Money';
import { InputField } from 'shared/Form';

import { OfferSelectFieldAsync } from '../../../../offers/shared';
import { useFacilityConsumer } from '../../../../context';
import { IAddBookingDto } from '../../../dto';
import { IOffer } from '../../../../offers/types';
import { SelectDateModal } from './SelectDateModal';
import { FormattedDate } from '../../../../../shared/Date';
import { Icon } from '../../../../../shared/Icon';

const BookedRecordFields = () => {
  const { facilityId } = useFacilityConsumer();
  const color = useColorModeValue('primary.500', 'primary.300');

  // todo: handle by facility configuration
  const currency = Currency.Pln;

  const [selectedOffers, setSelectedOffers] = useState<{ fieldId: string; offer: IOffer }[]>([]);

  const { control, watch, getValues } = useFormContext<IAddBookingDto>();
  const { fields, append, remove } = useFieldArray({ control, name: 'bookedRecords' });

  const total = Money.total(selectedOffers.map(({ offer }) => Money.from(Number(offer.price.value), offer.price.currency)));
  const customerId = watch('customerId');

  const bookedRecords = getValues().bookedRecords;
  const isMany = bookedRecords && bookedRecords.length > 1;
  const lastRecordIsSet = bookedRecords ? Object.values(bookedRecords[bookedRecords.length - 1]).every(value => value) : false;

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
                    name={offerIdName}
                    id={offerIdName}
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
                <InputField label='' name={employeeIdName} id={employeeIdName} />
                <InputField label='' name={dateName} id={dateName} />
              </Box>
              <VStack spacing={3}>
                {isFilled && (
                  <VStack w='100%' align='flex-start' justify='space-between'>
                    <Flex>
                      <FormattedMessage
                        id='selected-employee'
                        defaultMessage='Employee: {employeeName}'
                        values={{
                          employeeName: (
                            <chakra.b ml={1} color={color}>
                              {/* todo: EmployeeNameAsync component */}
                              Mocked John Smitch
                            </chakra.b>
                          ),
                        }}
                      />
                    </Flex>
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
    </VStack>
  );
};

export { BookedRecordFields };
