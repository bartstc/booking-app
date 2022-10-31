import React, { Suspense } from 'react';

import { useQueryParams } from 'shared/Params';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { DefaultTable, TableContainer, TableLoader, Tfoot, useTable } from 'shared/Table';

import { IFacilityCollectionQueryParams } from '../../../application/types';
import { useEnterpriseContextSelector } from '../../../../context';
import { useFacilitiesQuery } from '../../../infrastructure/query';
import { useColumns } from './useColumns';

const FacilitiesTableSuspense = () => {
  const { params } = useQueryParams<IFacilityCollectionQueryParams>();
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);

  const columns = useColumns();

  const { collection, meta } = useFacilitiesQuery(enterpriseId, params, {
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

const FacilitiesTable = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TableLoader />}>
        <FacilitiesTableSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

export { FacilitiesTable };