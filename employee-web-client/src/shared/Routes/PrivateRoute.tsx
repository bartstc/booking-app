import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { useAuthContextSelector } from 'modules/auth/application';

interface IProps extends RouteProps {}

const PrivateRoute = (props: IProps) => {
  const isAuthenticated = useAuthContextSelector(state => state.isAuthenticated);
  const login = useAuthContextSelector(state => state.login);

  if (isAuthenticated()) {
    return <Route {...props} />;
  }

  login();
  return (
    // todo: loader
    <h1>Signin Redirect Loading...</h1>
  );
};

export { PrivateRoute };
