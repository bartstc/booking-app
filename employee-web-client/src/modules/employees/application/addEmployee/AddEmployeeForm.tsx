import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VStack } from '@chakra-ui/react';

import { ContactType, IContact } from 'types';
import { DateField, Form, InputField } from 'shared/Form';

import { useValidationSchema } from './useValidationSchema';
import { ContactsFields } from './ContactsFields';

export interface IAddEmployeeDto {
  employeeName: string;
  birthDate: string;
  employmentDate: string;
  position: string;
  contacts: IContact[];
}

const AddEmployeeForm = () => {
  const schema = useValidationSchema();

  return (
    <Form<IAddEmployeeDto>
      schema={schema}
      onSubmit={model => alert(JSON.stringify(model, null, 2))}
      defaultValues={{
        employeeName: '',
        position: '',
        birthDate: '',
        employmentDate: '',
        contacts: [
          {
            type: ContactType.Phone,
            value: '+48',
          },
        ],
      }}
    >
      <VStack>
        <InputField name='employeeName' label={<FormattedMessage id='employee-name' defaultMessage='Full name' />} id='employee-name' />
        <InputField name='position' label={<FormattedMessage id='position' defaultMessage='Position' />} id='employee-position' />
        <DateField name='birthDate' label={<FormattedMessage id='birth-date' defaultMessage='Birth date' />} id='birth-date' />
        <DateField
          name='employmentDate'
          label={<FormattedMessage id='employment-date' defaultMessage='Employment date' />}
          id='employment-date'
        />
        <ContactsFields />
      </VStack>
    </Form>
  );
};

export { AddEmployeeForm };
