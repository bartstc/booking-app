import React from 'react';

import { PrivateRoutes, PublicRoutes } from 'shared/Routes';
import { useAuthContextSelector } from 'modules/auth/application';

const App = () => {
  const isAuthenticated = useAuthContextSelector(state => state.isAuthenticated);

  if (isAuthenticated()) {
    return <PrivateRoutes />;
  }

  return <PublicRoutes />;
};

export { App };
