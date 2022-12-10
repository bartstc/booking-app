import React from 'react';

import { compose } from 'utils';

import { useQueryParams } from 'shared/Params';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { Tfoot, TContainer, useTable, DefaultTable, withTableSuspense } from 'shared/Table';

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
    <TContainer count={collection.length}>
      <DefaultTable table={table} />
      <Tfoot meta={meta} collectionCount={collection.length} />
    </TContainer>
  );
};

export const CustomersTable = compose(withErrorBoundary, withTableSuspense)(CustomersTableSuspense);
