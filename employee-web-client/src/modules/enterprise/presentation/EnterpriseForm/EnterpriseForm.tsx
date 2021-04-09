import React, { ReactNode } from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Form } from 'shared/Form';

import { ICreateEnterpriseDto } from '../../application/types';
import { useCreateEnterpriseValidationSchema } from '../../application';

const createDefaultValues: ICreateEnterpriseDto = {
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
  onSubmit: (model: ICreateEnterpriseDto, methods: UseFormMethods<ICreateEnterpriseDto>) => void;
  children: ReactNode;
  defaultValues?: ICreateEnterpriseDto;
}

const EnterpriseForm = ({ onSubmit, children, defaultValues = createDefaultValues }: IProps) => {
  const schema = useCreateEnterpriseValidationSchema();

  return (
    <Form<ICreateEnterpriseDto> onSubmit={onSubmit} id='create-enterprise' schema={schema} defaultValues={defaultValues}>
      {children}
    </Form>
  );
};

export { EnterpriseForm };
