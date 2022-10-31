import React, { Suspense } from 'react';

import { useQueryParams } from 'shared/Params';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { Table, TableContainer, TableLoader, Tbody, Td, Tfoot, Th, Thead, Tr, useTable } from 'shared/Table';

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
      <Table>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Th key={header.id} {...header} />
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id} {...cell} />
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
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
