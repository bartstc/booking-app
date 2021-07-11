import React from 'react';

import { useAuthContextSelector } from 'modules/auth/application';

const SilentRenew = () => {
  const signinSilentCallback = useAuthContextSelector(state => state.signinSilentCallback);

  signinSilentCallback();
  return <h1>Logout Loading...</h1>;
};

export { SilentRenew };
