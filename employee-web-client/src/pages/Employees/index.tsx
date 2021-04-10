import React from 'react';
import { VStack } from '@chakra-ui/react';

import { PageWrapper } from 'shared/Layout/Page';
import { withErrorBoundary } from 'shared/ErrorBoundary';

import { EmployeesCollection } from 'modules/employees/presentation';

import { Header } from './Header';
import { Panel } from './Panel';

const Employees = () => {
  return (
    <PageWrapper>
      <Header />
      <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
        <Panel />
        <EmployeesCollection />
      </VStack>
    </PageWrapper>
  );
};

export default withErrorBoundary(Employees);
