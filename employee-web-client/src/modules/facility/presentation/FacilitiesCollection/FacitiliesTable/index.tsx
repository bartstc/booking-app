import React from 'react';

import { compose } from 'utils';

import { useQueryParams } from 'shared/Params';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { DefaultTable, TContainer, Tfoot, useTable, withTableSuspense } from 'shared/Table';

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
    <TContainer count={collection.length}>
      <DefaultTable table={table} />
      <Tfoot meta={meta} collectionCount={collection.length} />
    </TContainer>
  );
};

export const FacilitiesTable = compose(withErrorBoundary, withTableSuspense)(FacilitiesTableSuspense);
