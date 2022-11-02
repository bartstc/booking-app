import React from 'react';

import { compose } from 'utils';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { TableContainer, useTable, DefaultTable, withTableSuspense } from 'shared/Table';

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

export const SchedulesTable = compose(withErrorBoundary, withTableSuspense)(SchedulesTableSuspense);
