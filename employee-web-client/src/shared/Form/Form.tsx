import React, { ReactNode, useState } from 'react';
import { FormProvider, useForm, UseFormMethods as ReactHookFormMethods, UseFormOptions } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';

import { FormStatus } from './FormStatus';

export type UseFormMethods<T> = ReactHookFormMethods<T> & {
  status: FormStatus;
  setStatus: (status: FormStatus) => void;
};

interface IProps<T> extends UseFormOptions<T> {
  onSubmit: (model: T, methods: UseFormMethods<T>) => void;
  children: ReactNode | ((data: UseFormMethods<T>) => ReactNode);
  id: string;
  schema?: ObjectSchema;
  resetOnSubmit?: boolean;
  initialStatus?: FormStatus;
}

const Form = <T extends object>({
  onSubmit,
  schema,
  children,
  resetOnSubmit = true,
  id,
  initialStatus = FormStatus.Unsaved_changes,
  ...options
}: IProps<T>) => {
  const [status, setStatus] = useState(initialStatus);

  const methods = useForm<T>({
    resolver: schema ? yupResolver(schema) : undefined,
    mode: 'all',
    ...options,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSubmit = async (model: any) => {
    try {
      await onSubmit(model, { ...methods, setStatus, status });
    } catch {
      setStatus(FormStatus.Save_failure);
    } finally {
      resetOnSubmit && methods.reset();
    }
  };

  return (
    <FormProvider {...methods} status={status} setStatus={setStatus}>
      <form noValidate id={id} onSubmit={methods.handleSubmit(handleSubmit)}>
        {typeof children === 'function' ? children({ ...methods, status, setStatus }) : children}
      </form>
    </FormProvider>
  );
};

export { Form };
