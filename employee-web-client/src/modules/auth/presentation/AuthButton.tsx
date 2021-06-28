import React from 'react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { useAuth } from '../application';

const AuthButton = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export { AuthButton };
