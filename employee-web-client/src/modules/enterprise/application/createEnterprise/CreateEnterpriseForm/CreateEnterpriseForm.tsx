import React, { ReactNode } from 'react';

import { Form, FormStatus } from 'shared/Form';

import { ICreateEnterpriseDto } from '../../../dto';
import { useValidationSchema } from './useValidationSchema';
import { EnhancedUseFormMethods } from '../../../../../shared/Form/Form';

const createDefaultValues: ICreateEnterpriseDto = {
  countryCode: 'PL',
  enterpriseName: '',
  enterpriseDescription: '',
  enterpriseUrl: '',
  contactPerson: {
    email: '',
    fax: undefined,
    phone: '+48',
    name: '',
  },
};

interface IProps {
  onSubmit: (model: ICreateEnterpriseDto, methods: EnhancedUseFormMethods<ICreateEnterpriseDto>) => void;
  children: ReactNode;
  defaultValues?: ICreateEnterpriseDto;
  status?: FormStatus;
}

const CreateEnterpriseForm = ({ onSubmit, children, defaultValues = createDefaultValues, status }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<ICreateEnterpriseDto>
      onSubmit={onSubmit}
      id='create-enterprise'
      schema={schema}
      initialStatus={status}
      defaultValues={defaultValues}
    >
      {children}
    </Form>
  );
};

export { CreateEnterpriseForm };
