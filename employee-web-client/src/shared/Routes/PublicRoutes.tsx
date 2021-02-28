import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from '../Layout';
import { Spinner } from '../Spinner';

const Schedule = lazy(() => import('../../pages/Schedule'));
const Customers = lazy(() => import('../../pages/Customers'));
const Employees = lazy(() => import('../../pages/Employees'));
const Offers = lazy(() => import('../../pages/Offers'));
const Settings = lazy(() => import('../../pages/Settings'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));

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
          <Route path='/dashboard' component={Dashboard} />
          <Route render={() => <Redirect to={'dashboard/enterprise'} />} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export { PublicRoutes };
