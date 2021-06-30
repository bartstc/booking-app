import React from 'react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { useAuthContextSelector } from '../application';

const AuthButton = () => {
  const oidcStorage = JSON.parse(
    window.localStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH0_DOMAIN}/:${process.env.REACT_APP_AUTH0_CLIENT_ID}`)!,
  );

  console.log(oidcStorage);

  const isAuthenticated = useAuthContextSelector(state => state.isAuthenticated);

  return isAuthenticated() ? <LogoutButton /> : <LoginButton />;
};

export { AuthButton };
