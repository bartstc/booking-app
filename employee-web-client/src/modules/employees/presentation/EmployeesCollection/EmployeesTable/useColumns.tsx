import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonGroup } from '@chakra-ui/react';

import { useFormatDate } from 'shared/DateV2';
import { createColumn } from 'shared/Table';
import { ContactButtons } from 'shared/Contact';
import { ContactType } from 'types';

import { IEmployee } from '../../../application/types';
import { EmployeeStatusBadge } from '../../EmployeeStatusBadge';
import { StatusActionButtons } from './StatusActionButtons';

const columnBuilder = createColumn<IEmployee>();

export const useColumns = () => {
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

  return [
    columnBuilder.accessor('name', {
      id: 'name',
      cell: props => props.getValue(),
      header: formatMessage({
        id: 'full-name',
        defaultMessage: 'Full name',
      }),
      enableSorting: false,
    }),
    columnBuilder.accessor('status', {
      id: 'status',
      cell: props => <EmployeeStatusBadge status={props.getValue()} />,
      header: formatMessage({
        id: 'status',
        defaultMessage: 'Status',
      }),
      enableSorting: true,
    }),
    columnBuilder.accessor('position', {
      id: 'position',
      cell: props => props.getValue(),
      header: formatMessage({
        id: 'position',
        defaultMessage: 'Position',
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
        <ButtonGroup>
          <StatusActionButtons employeeId={props.row.original.employeeId} status={props.row.original.status} />
          <ContactButtons contacts={props.row.original.contacts} subject={formatMessage({ id: 'employee', defaultMessage: 'employee' })} />
        </ButtonGroup>
      ),
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
  ];
};
