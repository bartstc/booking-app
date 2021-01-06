import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import App from '../../App';
import { Layout } from '../Layout';

const Schedule = lazy(() => import('../../containers/Schedule'));
const Customers = lazy(() => import('../../containers/Customers'));
const Employees = lazy(() => import('../../containers/Employees'));
const Offers = lazy(() => import('../../containers/Offers'));
const Settings = lazy(() => import('../../containers/Settings'));

const PublicRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/schedule' component={Schedule} exact />
          <Route path='/customers' component={Customers} exact />
          <Route path='/employees' component={Employees} exact />
          <Route path='/offers' component={Offers} exact />
          <Route path='/settings' component={Settings} exact />
          <Route component={App} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export { PublicRoutes };
