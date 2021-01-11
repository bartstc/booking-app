import React, { createContext, ReactNode, useContext } from 'react';

import { Location } from './LocationManager';

type History = {
  push: Function;
  replace: Function;
};

interface IProps {
  location: Location;
  history: History;
  children?: ReactNode;
}

export interface Values {
  location: Location;
  history: History;
}

export const ShareContext = createContext<Values | undefined>(undefined);

const QueryParamsProvider = ({ history, location, children }: IProps) => {
  return <ShareContext.Provider value={{ history, location }}>{children}</ShareContext.Provider>;
};

export const useQueryParamsConsumer = (): Values => {
  const value = useContext(ShareContext);
  if (!value) {
    throw new Error(`Missing QueryParamsProvider`);
  }
  return value;
};

export { QueryParamsProvider };
