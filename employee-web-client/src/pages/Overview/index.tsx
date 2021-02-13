import React, { lazy, Suspense } from 'react';
import { VStack } from '@chakra-ui/react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { PageWrapper } from 'shared/Layout';
import { Spinner } from 'shared/Spinner';

import { Header } from './Header';

const FacilitiesTab = lazy(() => import('./FacilitiesTab'));
const EnterpriseTab = lazy(() => import('./EnterpriseTab'));

const Overview = () => {
  return (
    <PageWrapper spacing={{ base: 6, md: 10 }}>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path='/overview/enterprise' component={EnterpriseTab} />
            <Route path='/overview/facilities' component={FacilitiesTab} exact />
            <Route render={() => <Redirect to='/overview/enterprise' />} />
          </Switch>
        </Suspense>
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Overview);
