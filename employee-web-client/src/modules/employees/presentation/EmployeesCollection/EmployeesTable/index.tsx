import React from 'react';

import { compose } from 'utils';

import { useQueryParams } from 'shared/Params';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { DefaultTable, TContainer, Tfoot, useTable, withTableSuspense } from 'shared/Table';

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
    <TContainer count={collection.length}>
      <DefaultTable table={table} />
      <Tfoot meta={meta} collectionCount={collection.length} />
    </TContainer>
  );
};

export const EmployeesTable = compose(withErrorBoundary, withTableSuspense)(EmployeesTableSuspense);
