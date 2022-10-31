import React from 'react';
import { Cell, flexRender } from '@tanstack/react-table';
import { Td as ChakraTd } from '@chakra-ui/react';

interface IProps<TData> extends Cell<TData, unknown> {}

function Td<TData>(cell: IProps<TData>) {
  const meta = cell.column.columnDef.meta;

  return (
    <ChakraTd p='10px 18px' isNumeric={meta?.isNumeric}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </ChakraTd>
  );
}

export { Td };
