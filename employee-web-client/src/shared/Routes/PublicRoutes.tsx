import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Spinner } from '../Spinner';
import { Callback, Logout, LogoutCallback, SilentRenew } from './AuthRoutes';

const Home = lazy(() => import('../../pages/Home'));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path='/home' component={Home} />

        <Route path='/signin-oidc' component={Callback} />
        <Route path='/logout' component={Logout} />
        <Route path='/logout-callback' component={LogoutCallback} />
        <Route path='/silentrenew' component={SilentRenew} />

        <Route render={() => <Redirect to={'home'} />} />
      </Switch>
    </Suspense>
  );
};

export { PublicRoutes };
