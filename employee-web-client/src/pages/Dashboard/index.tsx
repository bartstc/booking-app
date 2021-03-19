import React, { lazy, Suspense } from 'react';
import { VStack } from '@chakra-ui/react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { PageWrapper } from 'shared/Layout';
import { Spinner } from 'shared/Spinner';

import { Header } from './Header';

const FacilitiesTab = lazy(() => import('./FacilitiesTab'));
const EnterpriseTab = lazy(() => import('./EnterpriseTab'));
const SchedulesTab = lazy(() => import('./SchedulesTab'));

const Dashboard = () => {
  return (
    <PageWrapper spacing={{ base: 6, md: 10 }}>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/dashboard/enterprise' component={EnterpriseTab} />
            <Route path='/dashboard/facilities' component={FacilitiesTab} exact />
            <Route path='/dashboard/schedules' component={SchedulesTab} exact />
            <Route render={() => <Redirect to='/dashboard/enterprise' />} />
          </Switch>
        </Suspense>
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Dashboard);
