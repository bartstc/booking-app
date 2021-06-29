import React from 'react';

import { useAuthContextSelector } from 'modules/auth/application';

const Callback = () => {
  const signinRedirectCallback = useAuthContextSelector(state => state.signinRedirectCallback);

  signinRedirectCallback();
  return <h1>Signin Redirect Callback Loading...</h1>;
};

export { Callback };
