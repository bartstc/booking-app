import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from '../Layout';
import { Spinner } from '../Spinner';

const Booking = lazy(() => import('../../pages/Booking'));
const AddBooking = lazy(() => import('../../pages/AddBooking'));
const Customers = lazy(() => import('../../pages/Customers'));
const Employees = lazy(() => import('../../pages/Employees'));
const Offers = lazy(() => import('../../pages/Offers'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));

const PublicRoutes = () => {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path='/bookings' component={Booking} exact />
          <Route path='/add-booking' component={AddBooking} exact />
          <Route path='/customers' component={Customers} exact />
          <Route path='/employees' component={Employees} exact />
          <Route path='/offers' component={Offers} exact />
          <Route path='/dashboard' component={Dashboard} />
          <Route render={() => <Redirect to={'dashboard/enterprise'} />} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export { PublicRoutes };
