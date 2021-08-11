import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Spinner } from 'shared/Spinner';

import { LogoutCallback, Logout, Callback, SilentRenew } from './AuthRoutes';
import { Layout } from '../Layout';

const Profile = lazy(() => import('../../pages/Profile'));

const PrivateRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/profile' component={Profile} exact />

          <Route path='/signin-oidc' component={Callback} />
          <Route path='/logout' component={Logout} />
          <Route path='/logout-callback' component={LogoutCallback} />
          <Route path='/silentrenew' component={SilentRenew} />

          <Route render={() => <Redirect to={'/profile'} />} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export { PrivateRoutes };
