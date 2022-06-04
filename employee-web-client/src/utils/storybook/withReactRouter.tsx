/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect } from 'react';
import { MemoryRouter, useHistory, MemoryRouterProps } from 'react-router';
import { useLocation } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import { QueryParamsProvider } from '../../shared/Params';

// eslint-disable-next-line react/display-name
export const withReactRouter = (config?: MemoryRouterProps) => (story: any) => {
  return (
    <MemoryRouter {...config}>
      <HistoryWatcher>
        <ReactRouterQueryParamsProvider>{story()}</ReactRouterQueryParamsProvider>
      </HistoryWatcher>
    </MemoryRouter>
  );
};

const HistoryWatcher = ({ children }: { children: ReactNode }) => {
  const { listen, action: locationAction } = useHistory();

  useEffect(() => {
    const unlisten = listen((location, type) => action(type)(location));

    return () => {
      unlisten();
    };
  }, [listen, locationAction]);

  return <>{children}</>;
};

const ReactRouterQueryParamsProvider = (props: { children: ReactNode }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <QueryParamsProvider location={location} history={history}>
      {props.children}
    </QueryParamsProvider>
  );
};
