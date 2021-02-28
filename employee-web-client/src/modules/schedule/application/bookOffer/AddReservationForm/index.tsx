import React from 'react';
import { Box, Flex, VStack, Center, HStack, Text } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';

import { DateField, Form, SelectField } from 'shared/Form';
import { Button, IconButton } from 'shared/Button';
import { OptionType } from 'types';

import { IAddReservationDto } from '../../../dto';

interface IProps {
  onSubmit: (model: IAddReservationDto) => void;
}

const mockedPersons: OptionType[] = [
  {
    value: '1',
    label: 'John Doe',
  },
  {
    value: '2',
    label: 'Jane Doe',
  },
  {
    value: '3',
    label: 'Sam Smith',
  },
];

const mockedOffers: OptionType[] = [
  {
    value: '1',
    label: 'Strzyżenie męskie - długie włosy',
  },
  {
    value: '2',
    label: 'Strzyżenie męskie - krótkie włosy',
  },
  {
    value: '3',
    label: 'Strzyżenie damskie',
  },
];

const AddReservationForm = ({ onSubmit }: IProps) => {
  return (
    <Form<IAddReservationDto>
      id='book-offer-form'
      onSubmit={onSubmit}
      defaultValues={{
        customerId: '',
        offers: [
          {
            employerId: '',
            offerId: '',
            dateFrom: '',
          },
        ],
      }}
    >
      <VStack w='100%' align='flex-start'>
        <Box w='100%' maxW='400px'>
          <SelectField
            options={mockedPersons}
            label={<FormattedMessage id='customer-name' defaultMessage='Client' />}
            name='customerId'
            id='customer-id'
          />
        </Box>
        <OfferFields />
      </VStack>
    </Form>
  );
};

const OfferFields = () => {
  const { formatMessage } = useIntl();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'offers' });

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;

        return (
          <Flex key={field.id} w='100%'>
            {fields.length > 1 && (
              <VStack spacing={3} mr={6} mt={2} mb={index === fields.length - 1 ? 8 : 0}>
                <Center backgroundColor='blue.500' w='28px' h='32px' borderRadius='50%' color='white' fontWeight='700'>
                  {index + 1}
                </Center>
                <Box h='100%' w='2px' backgroundColor='blue.500' />
              </VStack>
            )}
            <VStack spacing={2} w='100%' align='flex-start' mb={4}>
              <HStack w='100%' align='flex-start' justify='space-between' spacing={4}>
                <Box w='100%' maxW='400px'>
                  <SelectField
                    options={mockedPersons}
                    label={<FormattedMessage id='employer-name' defaultMessage='Employer' />}
                    name={`offers[${index}].employerId`}
                    id={`offers[${index}].employerId`}
                    tip={
                      <FormattedMessage
                        id='booking-empty-employer-tip'
                        defaultMessage='If the field is not completed, a random employee will be assigned to fulfill the offer'
                      />
                    }
                  />
                </Box>
                {!isFirst && (
                  <IconButton
                    title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                    colorScheme='red'
                    path={mdiDelete}
                    onClick={() => remove(index)}
                    mt='32px !important'
                  />
                )}
              </HStack>
              <Box w='100%' maxW='600px'>
                <SelectField
                  options={mockedOffers}
                  label={<FormattedMessage id='offer-name' defaultMessage='Offer' />}
                  name={`offers[${index}].offerId`}
                  id={`offers[${index}].offerId`}
                />
              </Box>
              <Box w='100%' maxW={{ base: '100%', md: '320px' }}>
                <DateField
                  showTimeInput
                  name={`offers[${index}].dateFrom`}
                  id={`offers[${index}].dateFrom`}
                  label={<FormattedMessage id='date-from' defaultMessage='Date and time' />}
                />
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
        <b>120 PLN</b>
      </Text>
    </VStack>
  );
};

export { AddReservationForm };
