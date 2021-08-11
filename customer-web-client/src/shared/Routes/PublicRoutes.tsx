import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Spinner } from 'shared/Spinner';

import { LogoutCallback, Logout, Callback, SilentRenew } from './AuthRoutes';
import { Layout } from '../Layout';

const Search = lazy(() => import('../../pages/Search'));
const OfferDetails = lazy(() => import('../../pages/OfferDetails'));

const PublicRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/search' component={Search} exact />
          <Route path='/offers/:offerId' component={OfferDetails} />

          <Route path='/signin-oidc' component={Callback} />
          <Route path='/logout' component={Logout} />
          <Route path='/logout-callback' component={LogoutCallback} />
          <Route path='/silentrenew' component={SilentRenew} />

          <Route render={() => <Redirect to={'/search'} />} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export { PublicRoutes };
