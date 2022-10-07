/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldValues, FormProviderProps } from 'react-hook-form';

import { createContext, useContextSelector } from 'use-context-selector';

import { UseFormMethods } from './useForm';

export type Selector<Fields, Selected> = (state: UseFormMethods<Fields>) => Selected;

const context = createContext<UseFormMethods<any> | null>(null);

export const FormProvider = <TFieldValues extends FieldValues>({ children, ...props }: FormProviderProps<TFieldValues>) => (
  <context.Provider value={props as unknown as UseFormMethods}>{children}</context.Provider>
);

export const useFormContextSelector = <Selected, Fields extends FieldValues = any>(selector: Selector<Fields, Selected>): Selected =>
  useContextSelector<UseFormMethods<Fields>, Selected>(context as any, selector);
