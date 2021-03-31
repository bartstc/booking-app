import React, { ReactNode } from 'react';
import { useValidationSchema } from './useValidationSchema';
import { UseFormMethods } from 'react-hook-form';

import { Form } from 'shared/Form';

import { ICreateEnterpriseDto } from '../../../dto';

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

const CreateEnterpriseForm = ({ onSubmit, children, defaultValues = createDefaultValues }: IProps) => {
  const schema = useValidationSchema();

  return (
    <Form<ICreateEnterpriseDto> onSubmit={onSubmit} id='create-enterprise' schema={schema} defaultValues={defaultValues}>
      {children}
    </Form>
  );
};

export { CreateEnterpriseForm };
