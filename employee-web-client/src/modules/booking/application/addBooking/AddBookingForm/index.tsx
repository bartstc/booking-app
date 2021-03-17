import React, { useState } from 'react';
import { HStack, VStack, Box } from '@chakra-ui/react';

import { Form, PreventLossData } from 'shared/Form';

import { CustomerSelectFieldAsync, SelectedCustomerOption } from '../../../../customers/shared';
import { IAddBookingDto } from '../../../dto';
import { AddNewCustomer } from './AddNewCustomer';
import { BookedRecordFields } from './BookedRecordFields';
import { Button } from '../../../../../shared/Button';
import { FormattedMessage } from 'react-intl';

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
          <Box pt={10}>
            <Button type='submit' form='add-booking-form' colorScheme='green' size='lg' px={10}>
              <FormattedMessage id='confirm' defaultMessage='Confirm' />
            </Button>
          </Box>
        </VStack>
      )}
    </Form>
  );
};

export { AddBookingForm };
