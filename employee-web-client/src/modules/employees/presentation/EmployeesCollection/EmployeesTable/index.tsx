import React, { Suspense } from 'react';

import { useQueryParams } from 'shared/Params';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { DefaultTable, TableContainer, TableLoader, Tfoot, useTable } from 'shared/Table';

import { useEnterpriseContextSelector } from '../../../../context';
import { IEmployeeCollectionQueryParams } from '../../../application/types';
import { useEmployeesQuery } from '../../../infrastructure/query';
import { useColumns } from './useColumns';

const EmployeesTableSuspense = () => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);

  const columns = useColumns();

  const { collection, meta } = useEmployeesQuery(enterpriseId, params, {
    keepPreviousData: true,
  });
  const table = useTable({
    columns,
    data: collection,
  });

  return (
    <TableContainer count={collection.length}>
      <DefaultTable table={table} />
      <Tfoot meta={meta} collectionCount={collection.length} />
    </TableContainer>
  );
};

const EmployeesTable = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TableLoader />}>
        <EmployeesTableSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

export { EmployeesTable };
