import React from 'react';

import { IFallbackProps } from './ErrorBoundary';
import { AjaxError } from '../../utils/http';
import { ClientErrorState, NotFoundState, ServerErrorState } from '../States';
import { Logger, mapAjaxErrorToLog } from '../../utils/logger';

const ErrorPageStrategy = ({ error, componentStack }: IFallbackProps<Error>) => {
  if (error instanceof AjaxError) {
    switch (error.status) {
      case 0:
      case 500:
        Logger.log(mapAjaxErrorToLog(error, componentStack), { sendAll: true });
        return <ServerErrorState />;
      case 401:
        // todo: logout
        return <h1>Todo 401 Error</h1>;
      case 403:
        return <h1>Todo 403 Error</h1>;
      case 404:
        return <NotFoundState />;
      default:
        Logger.log(mapAjaxErrorToLog(error, componentStack), { sendAll: true });
        return <ClientErrorState />;
    }
  }

  return <ClientErrorState />;
};

export { ErrorPageStrategy };
