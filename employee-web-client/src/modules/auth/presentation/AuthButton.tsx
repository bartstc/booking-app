import React from 'react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';

const AuthButton = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export { AuthButton };
