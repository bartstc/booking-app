import React, { useEffect } from 'react';

import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { useAuthContextSelector } from '../application';

const AuthButton = () => {
  const isAuthenticated = useAuthContextSelector(state => state.isAuthenticated);
  const getUser = useAuthContextSelector(state => state.getUser);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      console.log(user);
    };

    fetchUser();
  }, []);

  return isAuthenticated() ? <LogoutButton /> : <LoginButton />;
};

export { AuthButton };
