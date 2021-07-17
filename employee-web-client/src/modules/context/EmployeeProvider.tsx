import React, { ReactNode } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { IEmployee } from '../employees/application/types';

const context = createContext<Partial<IEmployee>>({});

interface IProviderProps {
  children: ReactNode;
  value: IEmployee;
}

export const EmployeeProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: IEmployee) => Selected;

export function useEmployeeContextSelector<Selected>(selector: Selector<Selected> = state => (state as unknown) as Selected) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<IEmployee, Selected>(context as any, selector)
  );
}
