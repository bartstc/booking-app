import React from 'react';
import { Badge } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { ContactType } from 'types';
import { useFormatDate } from 'shared/DateV2';
import { ContactButtons } from 'shared/Contact';
import { createColumn } from 'shared/Table';

import { ICustomer } from '../../../application/types';

const columnBuilder = createColumn<ICustomer>();

export const useColumns = () => {
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

  return [
    columnBuilder.accessor('fullName', {
      id: 'full-name',
      cell: props => props.getValue(),
      header: formatMessage({
        id: 'full-name',
        defaultMessage: 'Full name',
      }),
      enableSorting: true,
    }),
    columnBuilder.accessor(() => 'bookings', {
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
    columnBuilder.accessor(row => row.address, {
      id: 'address',
      cell: props => `${props.getValue().city}, ${props.getValue().street}`,
      header: formatMessage({
        id: 'address',
        defaultMessage: 'Address',
      }),
      enableSorting: false,
    }),
    columnBuilder.accessor(row => row.contacts, {
      id: 'phone',
      header: formatMessage({
        id: 'phone',
        defaultMessage: 'Phone number',
      }),
      cell: props => props.getValue().find(contact => contact.type === ContactType.Phone)?.value ?? '---',
      enableSorting: false,
    }),
    columnBuilder.accessor('birthDate', {
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
    columnBuilder.accessor(() => 'buttons', {
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
