import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';
import { RowData, TableOptions, Table } from '@tanstack/table-core';

type Options<TData> = Omit<TableOptions<TData>, 'getCoreRowModel'> & { getCoreRowModel?: TableOptions<TData>['getCoreRowModel'] };

export function useTable<TData extends RowData>(options: Options<TData>): Table<TData> {
  return useReactTable({
    ...options,
    getCoreRowModel: options.getCoreRowModel ?? getCoreRowModel(),
  });
}

export const createColumn = createColumnHelper;
