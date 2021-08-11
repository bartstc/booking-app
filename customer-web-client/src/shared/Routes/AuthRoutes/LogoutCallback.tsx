import React from 'react';

import { useAuthContextSelector } from 'modules/auth/application';
import { Spinner } from '../../Spinner';

const LogoutCallback = () => {
  const signoutRedirectCallback = useAuthContextSelector(state => state.signoutRedirectCallback);

  signoutRedirectCallback();
  return <Spinner />;
};

export { LogoutCallback };
