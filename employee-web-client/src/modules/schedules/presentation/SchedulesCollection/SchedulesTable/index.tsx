import React, { Suspense } from 'react';

import { ErrorBoundary } from 'shared/ErrorBoundary';
import { TableLoader, TableContainer, useTable, DefaultTable } from 'shared/Table';

import { useSchedulesQuery } from '../../../infrastructure/query';
import { useFacilityContextSelector } from '../../../../context';
import { useColumns } from './useColumns';

const SchedulesTableSuspense = () => {
  const { facilityId } = useFacilityContextSelector();

  const columns = useColumns();
  const { collection } = useSchedulesQuery(facilityId, {
    keepPreviousData: true,
  });
  const table = useTable({
    columns,
    data: collection,
  });

  return (
    <TableContainer count={collection.length}>
      <DefaultTable table={table} />
    </TableContainer>
  );
};

const SchedulesTable = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TableLoader />}>
        <SchedulesTableSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

export { SchedulesTable };
