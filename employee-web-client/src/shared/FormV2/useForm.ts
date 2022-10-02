import { useRef } from 'react';
import { useForm as useRHForm, FieldValues, UseFormMethods as UseRHFormMethods, UseFormOptions as UseRHFormOptions } from 'react-hook-form';

import { Configuration, ConfigurationSelector, useConfiguration } from './configuration';

export interface UseFormOptions<TFieldValues extends FieldValues = FieldValues, TContext extends object = object>
  extends UseRHFormOptions<TFieldValues, TContext> {
  configuration?: Partial<Configuration>;
}

export interface UseFormMethods<TFieldValues extends FieldValues = FieldValues> extends UseRHFormMethods<TFieldValues> {
  id: string;
  configuration: Configuration;

  setConfiguration(configuration: ConfigurationSelector | Partial<Configuration>): void;
}

export const useForm = <TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  options?: UseFormOptions<TFieldValues, TContext>,
): UseFormMethods<TFieldValues> => {
  const id = useRef(generateId());
  const form = useRHForm({
    mode: 'onChange',
    ...options,
  });
  const [configuration, setConfiguration] = useConfiguration(options?.configuration);

  return {
    id: id.current,
    ...form,
    configuration,
    setConfiguration,
  };
};

const generateId = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};
