import React, { ReactNode } from 'react';
import { UseFormMethods } from 'react-hook-form';

import { Form } from 'shared/Form';

import { IUpdateEnterpriseDto } from '../../application/types';
import { useCreateEnterpriseValidationSchema } from '../../application';

const createDefaultValues: IUpdateEnterpriseDto = {
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
  onSubmit: (model: IUpdateEnterpriseDto, methods: UseFormMethods<IUpdateEnterpriseDto>) => void;
  children: ReactNode;
  defaultValues?: IUpdateEnterpriseDto;
}

const EnterpriseForm = ({ onSubmit, children, defaultValues = createDefaultValues }: IProps) => {
  const schema = useCreateEnterpriseValidationSchema();

  return (
    <Form<IUpdateEnterpriseDto> onSubmit={onSubmit} id='create-enterprise' schema={schema} defaultValues={defaultValues}>
      {children}
    </Form>
  );
};

export { EnterpriseForm };
