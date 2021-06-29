import React from 'react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { useAuthContextSelector } from '../application';

const AuthButton = () => {
  const isAuthenticated = useAuthContextSelector(state => state.isAuthenticated);

  return isAuthenticated() ? <LogoutButton /> : <LoginButton />;
};

export { AuthButton };
