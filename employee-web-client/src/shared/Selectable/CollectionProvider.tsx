import React, { ReactNode } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { ICollectionStore } from './createCollectionStore';

type CollectionStore = ICollectionStore<string>;

const context = createContext<Partial<CollectionStore>>({});

interface IProviderProps {
  children: ReactNode;
  value: CollectionStore;
}

export const CollectionStoreProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: CollectionStore) => Selected;

export function useCollectionStoreContextSelector<Selected>(selector: Selector<Selected> = state => (state as unknown) as Selected) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<CollectionStore, Selected>(context as any, selector)
  );
}
