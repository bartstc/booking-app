import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { HStack, VStack } from '@chakra-ui/react';

import { Form, PreventLossData } from 'shared/Form';
import { Button } from 'shared/Button';
import { OptionType } from 'types';

import { IAddBookingDto } from '../../../dto';
import { AddNewCustomer } from './AddNewCustomer';
import { BookedRecordFields } from './BookedRecordFields';
import { CustomerSelectFieldAsync, SelectedCustomerOption } from '../../../../customersShared/presentation/CustomerSelectFieldAsync';

interface IProps {
  onSubmit: (model: IAddBookingDto) => void;
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

const AddBookingForm = ({ onSubmit, facilityId }: IProps) => {
  const [newCustomer, setNewCustomer] = useState<SelectedCustomerOption>();

  return (
    <Form<IAddBookingDto> id='add-booking-form' onSubmit={onSubmit} defaultValues={defaultValues}>
      {({ watch, setValue, reset }) => (
        <VStack w='100%' align='stretch'>
          <HStack align='flex-start' maxW='450px'>
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
          <BookedRecordFields />
          <PreventLossData />
          <HStack w='100%' pt={{ base: 6, md: 8 }}>
            <Button type='submit' form='add-booking-form' colorScheme='green' size='lg'>
              <FormattedMessage id='confirm-booking' defaultMessage='Confirm booking' />
            </Button>
          </HStack>
        </VStack>
      )}
    </Form>
  );
};

export { AddBookingForm };
