import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../../App';
import { Layout } from '../Layout';

const PublicRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/schedule' component={App} exact />
      </Switch>
    </Layout>
  );
};

export { PublicRoutes };
