import React, { Suspense } from 'react';
import { Badge } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';

import { useQueryParams } from 'shared/Params';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { ContactType } from 'types';
import { useFormatDate } from 'shared/DateV2';
import { ContactButtons } from 'shared/Contact';
import { Th, Tr, Tbody, Thead, Tfoot, TableLoader, TableContainer, Table, Td } from 'shared/Table';

import { ICustomer, ICustomerCollectionQueryParams } from '../../../application/types';
import { useCustomersQuery } from '../../../infrastructure/query';
import { useFacilityContextSelector } from '../../../../context';

const columnHelper = createColumnHelper<ICustomer>();

const useCols = () => {
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

  return [
    columnHelper.accessor('fullName', {
      id: 'full-name',
      cell: props => props.getValue(),
      header: formatMessage({
        id: 'full-name',
        defaultMessage: 'Full name',
      }),
      enableSorting: true,
    }),
    columnHelper.accessor(() => 'bookings', {
      id: 'bookings',
      cell: () => (
        <Badge variant='subtle' colorScheme='gray'>
          0 pending
        </Badge>
      ),
      header: formatMessage({
        id: 'bookings',
        defaultMessage: 'Bookings',
      }),
      enableSorting: false,
    }),
    columnHelper.accessor(row => row.address, {
      id: 'address',
      cell: props => `${props.getValue().city}, ${props.getValue().street}`,
      header: formatMessage({
        id: 'address',
        defaultMessage: 'Address',
      }),
      enableSorting: false,
    }),
    columnHelper.accessor(row => row.contacts, {
      id: 'phone',
      header: formatMessage({
        id: 'phone',
        defaultMessage: 'Phone number',
      }),
      cell: props => props.getValue().find(contact => contact.type === ContactType.Phone)?.value ?? '---',
      enableSorting: false,
    }),
    columnHelper.accessor('birthDate', {
      id: 'birth-date',
      header: formatMessage({
        id: 'birth-date',
        defaultMessage: 'Birth date',
      }),
      cell: props => formatDate(props.getValue()),
      enableSorting: true,
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor(() => 'buttons', {
      id: 'buttons',
      header: '',
      cell: props => (
        <ContactButtons contacts={props.row.original.contacts} subject={formatMessage({ id: 'customer', defaultMessage: 'customer' })} />
      ),
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
  ];
};

const CustomersTableSuspense = () => {
  const { params } = useQueryParams<ICustomerCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();
  const columns = useCols();

  const { collection, meta } = useCustomersQuery(facilityId, params);
  const table = useReactTable({
    columns,
    data: collection,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
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

const CustomersTable = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<TableLoader />}>
        <CustomersTableSuspense />
      </Suspense>
    </ErrorBoundary>
  );
};

export { CustomersTable };
