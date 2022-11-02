import React from 'react';

import { compose } from 'utils';

import { withPaginationParamsCorrector } from 'shared/Params';
import { PageContainer } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { CollectionContainer } from 'shared/Collection';

import { EmployeesCollection } from 'modules/employees/presentation';
import { EMPLOYEE_COLLECTION_DEFAULT_PARAMS } from 'modules/employees/application';

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

export default compose(withErrorBoundary, withPaginationParamsCorrector(EMPLOYEE_COLLECTION_DEFAULT_PARAMS))(Employees);
