/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { UseFormMethods, FieldValues } from 'react-hook-form';

import { FormStatus } from 'shared/Form';

export type OverrideUseFormMethods<TFieldValues extends FieldValues = FieldValues> = {
  status: FormStatus;
  setStatus: (status: FormStatus) => void;
} & UseFormMethods<TFieldValues>;

declare module 'react-hook-form' {
  type OverrideFormProviderProps<TFieldValues extends FieldValues = FieldValues> = {
    children: ReactNode;
  } & OverrideUseFormMethods<TFieldValues>;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  export function FormProvider<TFieldValues extends Record<string, any>>({
    children,
    ...props
  }: OverrideFormProviderProps<TFieldValues>): JSX.Element;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  export function useFormContext<TFieldValues extends Record<string, any>>(): OverrideUseFormMethods<TFieldValues>;
}
