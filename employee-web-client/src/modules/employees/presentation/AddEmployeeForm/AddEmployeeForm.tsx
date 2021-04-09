import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SimpleGrid } from '@chakra-ui/react';
import { DateField, InputField } from 'react-hook-form-chakra-fields';

import { ContactType } from 'types';
import { Form } from 'shared/Form';
import { ContactsFields } from 'shared/Form/Implementations';

import { IAddEmployeeDto } from '../../application/types';
import { useAddOfferValidationSchema } from '../../application';

interface IProps {
  onSubmit: (model: IAddEmployeeDto) => void;
}

const AddEmployeeForm = ({ onSubmit }: IProps) => {
  const schema = useAddOfferValidationSchema();

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
            value: '',
          },
        ],
      }}
    >
      <SimpleGrid columns={3} spacingX={4}>
        <InputField
          name='employeeName'
          label={<FormattedMessage id='employee-name' defaultMessage='Full name' />}
          id='employee-name'
          colSpan={3}
        />
        <InputField
          name='position'
          label={<FormattedMessage id='position' defaultMessage='Position' />}
          id='employee-position'
          colSpan={{ base: 3, md: 2 }}
        />
        <DateField
          name='birthDate'
          label={<FormattedMessage id='birth-date' defaultMessage='Birth date' />}
          id='birth-date'
          colSpan={{ base: 3, md: 2 }}
        />
        <DateField
          name='employmentDate'
          label={<FormattedMessage id='employment-date' defaultMessage='Employment date' />}
          id='employment-date'
          colSpan={{ base: 3, md: 2 }}
        />
      </SimpleGrid>
      <ContactsFields />
    </Form>
  );
};

export { AddEmployeeForm };
