import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SimpleGrid } from '@chakra-ui/react';
import { DateField, InputField } from 'react-hook-form-chakra-fields';

import { ContactType } from 'types';
import { Form } from 'shared/Form';
import { ContactsFields } from 'shared/Form/Implementations';

import { IAddEmployeeDto } from '../../application/types';
import { useAddEmployeeValidationSchema } from '../../application';
import { FacilitiesSelectFieldAsync } from '../../../facility/presentation/FacilitiesSelectFieldAsync';
import { useEnterpriseContextSelector } from '../../../context';

interface IProps {
  onSubmit: (model: IAddEmployeeDto) => void;
}

const AddEmployeeForm = ({ onSubmit }: IProps) => {
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);
  const schema = useAddEmployeeValidationSchema();

  return (
    <Form<IAddEmployeeDto>
      id='add-employee-form'
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={{
        employeeName: '',
        employeeEmail: '',
        password: '',
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
        <InputField
          name='employeeEmail'
          label={<FormattedMessage id='email' defaultMessage='Email' />}
          id='employee-email'
          colSpan={{ base: 3, md: 2 }}
        />
        <InputField
          name='password'
          label={<FormattedMessage id='password' defaultMessage='Password' />}
          id='employee-password'
          colSpan={{ base: 3, md: 2 }}
          tip={
            <FormattedMessage
              id='password-tip'
              defaultMessage='Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
            />
          }
        />
        <FacilitiesSelectFieldAsync
          enterpriseId={enterpriseId}
          id='facility-ids'
          name='facilityIds'
          colSpan={3}
          tip={<FormattedMessage id='facility-ids-tip' defaultMessage='Select all facilities to which the employee should have access.' />}
        />
      </SimpleGrid>
      <ContactsFields />
    </Form>
  );
};

export { AddEmployeeForm };
