import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SimpleGrid } from '@chakra-ui/react';

import { ContactType } from 'types';
import { DateField, Form, InputField, MaskedInputField, masks } from 'shared/Form';
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
      <SimpleGrid columns={6} spacingX={4}>
        <InputField name='fullName' label={<FormattedMessage id='full-name' defaultMessage='Full name' />} id='customer-name' colSpan={6} />
        <DateField
          name='birthDate'
          label={<FormattedMessage id='birth-date' defaultMessage='Birth date' />}
          id='birth-date'
          colSpan={{ base: 4, md: 3 }}
        />
        <InputField
          name='address.city'
          label={<FormattedMessage id='city' defaultMessage='City' />}
          id='address-city'
          colSpan={{ base: 6, md: 4 }}
        />
        <InputField
          name='address.street'
          label={<FormattedMessage id='street' defaultMessage='Street' />}
          id='address-street'
          colSpan={{ base: 6, md: 4 }}
        />
        <MaskedInputField
          name='address.postCode'
          label={<FormattedMessage id='post-code' defaultMessage='Post code' />}
          id='address-post-code'
          mask={masks.postCode}
          colSpan={{ base: 4, md: 3 }}
        />
        <InputField
          name='description'
          as='textarea'
          required={false}
          label={<FormattedMessage id='description' defaultMessage='Description' />}
          id='customer-description'
          colSpan={6}
        />
      </SimpleGrid>
      <ContactsFields />
    </Form>
  );
};

export { AddCustomerForm };
