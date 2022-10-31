import React from 'react';

import { PageContainer } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { CollectionContainer } from 'shared/Collection';

import { EmployeesCollection } from 'modules/employees/presentation';

import { Header } from './Header';
import { Panel } from './Panel';

const Employees = () => {
  return (
    <PageContainer>
      <Header />
      <CollectionContainer>
        <Panel />
        <EmployeesCollection />
      </CollectionContainer>
    </PageContainer>
  );
};

export default withErrorBoundary(Employees);
