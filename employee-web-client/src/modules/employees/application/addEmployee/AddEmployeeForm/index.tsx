import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VStack, Box } from '@chakra-ui/react';

import { ContactType } from 'types';
import { DateField, Form, InputField } from 'shared/Form';

import { useValidationSchema } from './useValidationSchema';
import { ContactsFields } from './ContactsFields';
import { IAddEmployeeDto } from '../../../dto';

interface IProps {
  onSubmit: (model: IAddEmployeeDto) => void;
}

const AddEmployeeForm = ({ onSubmit }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<IAddEmployeeDto>
      id='add-employee-form'
      schema={schema}
      onSubmit={onSubmit}
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
      <VStack w='100%' align='flex-start'>
        <InputField name='employeeName' label={<FormattedMessage id='employee-name' defaultMessage='Full name' />} id='employee-name' />
        <Box w='100%' maxW='350px'>
          <InputField name='position' label={<FormattedMessage id='position' defaultMessage='Position' />} id='employee-position' />
        </Box>
        <Box w='100%' maxW='300px'>
          <DateField name='birthDate' label={<FormattedMessage id='birth-date' defaultMessage='Birth date' />} id='birth-date' />
        </Box>
        <Box w='100%' maxW='300px'>
          <DateField
            name='employmentDate'
            label={<FormattedMessage id='employment-date' defaultMessage='Employment date' />}
            id='employment-date'
          />
        </Box>
        <ContactsFields />
      </VStack>
    </Form>
  );
};

export { AddEmployeeForm };
