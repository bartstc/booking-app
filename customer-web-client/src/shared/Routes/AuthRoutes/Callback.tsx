import React from 'react';

import { useAuthContextSelector } from 'modules/auth/application';
import { Spinner } from '../../Spinner';

const Callback = () => {
  const signinRedirectCallback = useAuthContextSelector(state => state.signinRedirectCallback);

  signinRedirectCallback();
  return <Spinner />;
};

export { Callback };
