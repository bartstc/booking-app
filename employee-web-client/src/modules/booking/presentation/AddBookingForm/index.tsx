import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';

import { Form, PreventLossData } from 'shared/Form';
import { Button } from 'shared/Button';
import { SectionContainer, SectionGrid, SectionHeader, SectionSubtitle, SectionTitle } from 'shared/ReadMode';
import { OptionType } from 'types';

import { IAddBookingDto } from '../../application/types';
import { AddNewCustomer } from './AddNewCustomer';
import { BookedRecordFields } from './BookedRecordFields';
import { CustomerSelectFieldAsync, SelectedCustomerOption } from '../../../customers/presentation';

interface IProps {
  onSubmit: (model: IAddBookingDto) => void;
  isLoading: boolean;
  facilityId: string;
}

const defaultValues = {
  customerId: '',
  bookedRecords: [
    {
      employerId: '',
      offerId: '',
      date: '',
    },
  ],
};

const AddBookingForm = ({ onSubmit, facilityId, isLoading }: IProps) => {
  const [newCustomer, setNewCustomer] = useState<SelectedCustomerOption>();

  return (
    <Form<IAddBookingDto> id='add-booking-form' onSubmit={onSubmit} defaultValues={defaultValues}>
      {({ watch, setValue, reset }) => (
        <VStack w='100%' align='stretch' pb={10}>
          <SectionContainer spacing={{ base: 8, lg: 12 }}>
            <SectionGrid>
              <GridItem colSpan={{ base: 3, lg: 1 }}>
                <SectionHeader>
                  <SectionTitle>
                    <FormattedMessage id='select-customer' defaultMessage='Select customer' />
                  </SectionTitle>
                  <SectionSubtitle>
                    <FormattedMessage
                      id='select-customer-description'
                      defaultMessage='Select customer from existing customers base or add new one if he is not registered already.'
                    />
                  </SectionSubtitle>
                </SectionHeader>
              </GridItem>
              <GridItem as={SimpleGrid} spacingX={4} columns={4} colSpan={{ base: 3, lg: 2 }}>
                <HStack as={GridItem} colSpan={{ base: 4, lg: 2 }} align='flex-start'>
                  <CustomerSelectFieldAsync
                    newOptions={newCustomer ? [newCustomer] : undefined}
                    name='customerId'
                    id='customer-id'
                    facilityId={facilityId}
                    isClearable={false}
                    onChangeEffect={option => {
                      if (!Array.isArray(option) && option?.value !== watch('customerId')) {
                        reset({ ...defaultValues, customerId: (option as OptionType).value });
                      }
                    }}
                    helperText={
                      !watch('customerId') ? undefined : (
                        <FormattedMessage
                          id='customer-change-affects-data'
                          defaultMessage='Change of the customer will affect the rest of the form fields.'
                        />
                      )
                    }
                  />
                  <AddNewCustomer
                    isDisabled={!!watch('customerId')}
                    onSuccess={(customerId, model) => {
                      setNewCustomer({
                        value: customerId,
                        label: model.fullName,
                        customer: { ...model, customerId, facilityId, description: model.description ?? null },
                      });
                      setValue('customerId', customerId);
                    }}
                  />
                </HStack>
              </GridItem>
            </SectionGrid>
            <BookedRecordFields />
          </SectionContainer>
          <PreventLossData />
          <HStack w='100%' pt={{ base: 6, md: 8 }}>
            <Button isLoading={isLoading} type='submit' form='add-booking-form' colorScheme='green' size='lg'>
              <FormattedMessage id='confirm-booking' defaultMessage='Confirm booking' />
            </Button>
          </HStack>
        </VStack>
      )}
    </Form>
  );
};

export { AddBookingForm };
