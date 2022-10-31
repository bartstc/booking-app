import React, { Suspense } from 'react';

import { useQueryParams } from 'shared/Params';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { Tfoot, TableLoader, TableContainer, useTable, DefaultTable } from 'shared/Table';

import { ICustomerCollectionQueryParams } from '../../../application/types';
import { useCustomersQuery } from '../../../infrastructure/query';
import { useFacilityContextSelector } from '../../../../context';
import { useColumns } from './useColumns';

const CustomersTableSuspense = () => {
  const { params } = useQueryParams<ICustomerCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();

  const columns = useColumns();

  const { collection, meta } = useCustomersQuery(facilityId, params, {
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

const CustomersTable = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TableLoader />}>
        <CustomersTableSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

export { CustomersTable };
