import React, { useState } from 'react';
import { HStack, VStack } from '@chakra-ui/react';

import { Form, PreventLossData } from 'shared/Form';

import { CustomerSelectFieldAsync, SelectedCustomerOption } from '../../../../customers/shared';
import { IAddBookingDto } from '../../../dto';
import { AddNewCustomer } from './AddNewCustomer';
import { BookedRecordFields } from './BookedRecordFields';

interface IProps {
  onSubmit: (model: IAddBookingDto) => void;
  facilityId: string;
}

const AddBookingForm = ({ onSubmit, facilityId }: IProps) => {
  const [newCustomer, setNewCustomer] = useState<SelectedCustomerOption>();

  return (
    <Form<IAddBookingDto>
      id='add-booking-form'
      onSubmit={onSubmit}
      defaultValues={{
        customerId: '',
        bookedRecords: [
          {
            employerId: '',
            offerId: '',
            date: '',
          },
        ],
      }}
    >
      {({ watch, setValue }) => (
        <VStack w='100%' align='stretch'>
          <HStack maxW='450px' mb={4}>
            <CustomerSelectFieldAsync
              newOptions={newCustomer ? [newCustomer] : undefined}
              name='customerId'
              id='customer-id'
              facilityId={facilityId}
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
        </VStack>
      )}
    </Form>
  );
};

export { AddBookingForm };
