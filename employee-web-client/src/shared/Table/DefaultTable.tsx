import React from 'react';
import { Table as TableProp } from '@tanstack/table-core';

import { Tbody, Td, Th, Thead, Tr, Table } from './index';

interface IProps<TData> {
  table: TableProp<TData>;
}

function DefaultTable<TData>({ table }: IProps<TData>) {
  return (
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
  );
}

export { DefaultTable };
