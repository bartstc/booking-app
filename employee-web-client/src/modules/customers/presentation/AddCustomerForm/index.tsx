import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SimpleGrid, chakra } from '@chakra-ui/react';

import { ContactType } from 'types';
import { FormProvider, useForm, TextInput, DateInput, Textarea, ContactInputs, PostCodeInput } from 'shared/FormV2';

import { IAddCustomerDto } from '../../application/types';

interface IProps {
  onSubmit: (model: IAddCustomerDto) => void;
}

const AddCustomerForm = ({ onSubmit }: IProps) => {
  const methods = useForm<IAddCustomerDto>({
    defaultValues: {
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
    },
  });

  return (
    <chakra.form id='add-customer-form' data-testid='add-customer-form' noValidate onSubmit={methods.handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <SimpleGrid columns={6} spacing={6}>
          <TextInput name='fullName' colSpan={6} isRequired>
            <FormattedMessage id='full-name' defaultMessage='Full name' />
          </TextInput>
          <DateInput name='birthDate' colSpan={{ base: 4, md: 3 }} isRequired>
            <FormattedMessage id='birth-date' defaultMessage='Birth date' />
          </DateInput>
          <TextInput name='address.city' colSpan={{ base: 6, md: 4 }} isRequired>
            <FormattedMessage id='city' defaultMessage='City' />
          </TextInput>
          <TextInput name='address.street' colSpan={{ base: 6, md: 4 }} isRequired>
            <FormattedMessage id='street' defaultMessage='Street' />
          </TextInput>
          <PostCodeInput name='address.postCode' colSpan={{ base: 6, md: 4 }} isRequired />
          <Textarea name='description' colSpan={6}>
            <FormattedMessage id='description' defaultMessage='Description' />
          </Textarea>
          <ContactInputs />
        </SimpleGrid>
      </FormProvider>
    </chakra.form>
  );
};

export { AddCustomerForm };
