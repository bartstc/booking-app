import React from 'react';
import { useNavigate, useLocation, NavigateOptions } from 'react-router-dom';

import { QueryParamsProvider } from 'shared/Params';

// eslint-disable-next-line react/display-name
export const withParams = () => (story: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <QueryParamsProvider
      location={location}
      history={{
        push: navigate,
        replace: (to: string, options?: NavigateOptions) => navigate(to, { replace: true, ...options }),
      }}
    >
      {story()}
    </QueryParamsProvider>
  );
};
