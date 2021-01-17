import React from 'react';

import { IFallbackProps } from './ErrorBoundary';
import { AjaxError } from '../../utils/http-service';
import { ClientErrorState, NotFoundState, ServerErrorState } from '../States';

const ErrorPageStrategy = ({ error }: IFallbackProps<Error>) => {
  if (error instanceof AjaxError) {
    switch (error.status) {
      case 0:
      case 500:
        return <ServerErrorState />;
      case 401:
        return <h1>Todo 401 Error</h1>;
      case 403:
        return <h1>Todo 403 Error</h1>;
      case 404:
        return <NotFoundState />;
      default:
        return <ClientErrorState />;
    }
  }

  return <ClientErrorState />;
};

export { ErrorPageStrategy };
