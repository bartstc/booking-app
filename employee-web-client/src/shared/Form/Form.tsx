import React, { ReactNode } from 'react';
import { FormProvider, useForm, UseFormMethods, UseFormOptions } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema } from 'yup';

interface IProps<T> extends UseFormOptions<T> {
  onSubmit: (model: T, methods: UseFormMethods<T>) => void;
  children: ReactNode | ((data: UseFormMethods<T>) => ReactNode);
  id: string;
  schema?: ObjectSchema;
  resetOnSubmit?: boolean;
}

const Form = <T extends object>({ onSubmit, schema, children, resetOnSubmit = true, id, ...options }: IProps<T>) => {
  const methods = useForm<T>({
    resolver: schema ? yupResolver(schema) : undefined,
    mode: 'all',
    ...options,
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleSubmit = async (model: any) => {
    await onSubmit(model, methods);
    resetOnSubmit && methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form noValidate id={id} onSubmit={methods.handleSubmit(handleSubmit)}>
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
};

export { Form };
