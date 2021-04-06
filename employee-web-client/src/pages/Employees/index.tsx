import React from 'react';

import { PageWrapper } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { EmployeesCollection } from 'modules/employees/presentation/EmployeesCollection';

const Employees = () => {
  return (
    <PageWrapper>
      <EmployeesCollection />
    </PageWrapper>
  );
};

export default withErrorBoundary(Employees);
