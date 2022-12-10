import React from 'react';

import { compose } from 'utils';

import { withErrorBoundary } from 'shared/ErrorBoundary';
import { TContainer, useTable, withTableSuspense, Table, Th, Tbody, Td, Thead, Tr } from 'shared/Table';

import { useSchedulesQuery } from '../../../infrastructure/query';
import { useFacilityContextSelector } from '../../../../context';
import { useColumns } from './useColumns';
import { useNavigate } from 'react-router-dom';

const SchedulesTableSuspense = () => {
  const navigate = useNavigate();
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
    <TContainer count={collection.length}>
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
            <Tr key={row.id} cursor='pointer' onClick={() => navigate(`/schedules/${row.original.scheduleId}`)}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id} {...cell} />
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TContainer>
  );
};

export const SchedulesTable = compose(withErrorBoundary, withTableSuspense)(SchedulesTableSuspense);
