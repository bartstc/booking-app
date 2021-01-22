import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VStack, Box } from '@chakra-ui/react';

import { ContactType } from 'types';
import { DateField, Form, InputField } from 'shared/Form';
import { ContactsFields } from 'shared/Form/Implementations';

import { useValidationSchema } from './useValidationSchema';
import { IAddCustomerDto } from '../../../dto';

interface IProps {
  onSubmit: (model: IAddCustomerDto) => void;
}

const AddCustomerForm = ({ onSubmit }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<IAddCustomerDto>
      id='add-customer-form'
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={{
        fullName: '',
        description: '',
        birthDate: '',
        address: {
          postCode: '',
          street: '',
          city: '',
        },
        contacts: [
          {
            type: ContactType.Phone,
            value: '',
          },
        ],
      }}
    >
      <VStack w='100%' align='flex-start'>
        <InputField name='fullName' label={<FormattedMessage id='full-name' defaultMessage='Full name' />} id='customer-name' />
        <Box w='100%' maxW='300px'>
          <DateField name='birthDate' label={<FormattedMessage id='birth-date' defaultMessage='Birth date' />} id='birth-date' />
        </Box>
        <Box w='100%' maxW='300px'>
          <InputField name='address.city' label={<FormattedMessage id='city' defaultMessage='City' />} id='address-city' />
          <InputField name='address.street' label={<FormattedMessage id='street' defaultMessage='Street' />} id='address-street' />
          <InputField
            name='address.postCode'
            label={<FormattedMessage id='post-code' defaultMessage='Post code' />}
            id='address-post-code'
          />
        </Box>
        <ContactsFields />
        <Box w='100%'>
          <InputField
            name='description'
            as='textarea'
            label={<FormattedMessage id='description' defaultMessage='Description' />}
            id='customer-description'
          />
        </Box>
      </VStack>
    </Form>
  );
};

export { AddCustomerForm };
