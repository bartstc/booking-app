import React, { createContext, ReactNode, useContext, useMemo } from 'react';

interface IShareProvider<T> {
  data: T;
  children: ReactNode;
}

const createSharedData = <T extends {}>() => {
  const ShareContext = createContext<T | undefined>(undefined);

  const ShareProvider = ({ children, data }: IShareProvider<T>) => {
    const value = useMemo(() => data, [data]);

    return <ShareContext.Provider value={value}>{children}</ShareContext.Provider>;
  };

  const useShareConsumer = () => {
    const contextValue = useContext(ShareContext);
    if (!contextValue) {
      throw new Error(`useShareConsumer must be used within a ShareContext`);
    }
    return contextValue;
  };

  return { ShareProvider, useShareConsumer };
};

export { createSharedData };
