import React, { ReactNode } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { IEnterprise } from '../enterprise/application/types';

const context = createContext<Partial<IEnterprise>>({});

interface IProviderProps {
  children: ReactNode;
  value: IEnterprise;
}

export const EnterpriseProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: IEnterprise) => Selected;

export function useEnterpriseContextSelector<Selected>(selector: Selector<Selected> = state => (state as unknown) as Selected) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<IEnterprise, Selected>(context as any, selector)
  );
}
