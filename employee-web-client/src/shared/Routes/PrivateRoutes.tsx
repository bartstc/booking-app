import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from '../Layout';
import { Spinner } from '../Spinner';

import { LogoutCallback, Logout, Callback, SilentRenew } from './AuthRoutes';

const Booking = lazy(() => import('../../pages/Booking'));
const AddBooking = lazy(() => import('../../pages/AddBooking'));
const Customers = lazy(() => import('../../pages/Customers'));
const Employees = lazy(() => import('../../pages/Employees'));
const Offers = lazy(() => import('../../pages/Offers'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Schedules = lazy(() => import('../../pages/Schedules'));
const Schedule = lazy(() => import('../../pages/Schedule'));

const PrivateRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/bookings' component={Booking} exact />
          <Route path='/add-booking' component={AddBooking} exact />
          <Route path='/customers' component={Customers} exact />
          <Route path='/employees' component={Employees} exact />
          <Route path='/offers' component={Offers} exact />
          <Route path='/schedules' component={Schedules} exact />
          <Route path='/schedules/:scheduleId' component={Schedule} />
          <Route path='/dashboard' component={Dashboard} />

          <Route path='/signin-oidc' component={Callback} />
          <Route path='/logout' component={Logout} />
          <Route path='/logout-callback' component={LogoutCallback} />
          <Route path='/silentrenew' component={SilentRenew} />

          <Route render={() => <Redirect to={'dashboard/enterprise'} />} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export { PrivateRoutes };
