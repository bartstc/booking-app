import React, { ReactNode } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { ITableConfig } from './ITableConfig';

interface IContextValue {
  config: ITableConfig;
}

const context = createContext<Partial<IContextValue>>({});

interface IProviderProps {
  children: ReactNode;
  value: IContextValue;
}

export const TableProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: IContextValue) => Selected;

export function useTableContextSelector<Selected>(selector: Selector<Selected> = state => (state as unknown) as Selected) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<IContextValue, Selected>(context as any, selector)
  );
}
