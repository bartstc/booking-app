import React, { ReactNode } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { IFacility } from '../facility/application/types';

const context = createContext<Partial<IFacility>>({});

interface IProviderProps {
  children: ReactNode;
  value: IFacility;
}

export const FacilityProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: IFacility) => Selected;

export function useFacilityContextSelector<Selected>(selector: Selector<Selected> = state => (state as unknown) as Selected) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<IFacility, Selected>(context as any, selector)
  );
}
