import React from 'react';

import { useAuthContextSelector } from 'modules/auth/application';

const Logout = () => {
  const logout = useAuthContextSelector(state => state.logout);

  logout();
  return <h1>Logout Loading...</h1>;
};

export { Logout };
