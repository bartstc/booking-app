import React from 'react';

import { useAuthContextSelector } from 'modules/auth/application';

const LogoutCallback = () => {
  const signoutRedirectCallback = useAuthContextSelector(state => state.signoutRedirectCallback);

  signoutRedirectCallback();
  return <h1>Logout Callback Loading...</h1>;
};

export { LogoutCallback };
