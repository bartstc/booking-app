import React from 'react';
import { useIntl } from 'react-intl';
import { Badge } from '@chakra-ui/react';

import { createColumn } from 'shared/Table';

import { BusinessCategoryDegreeType, BusinessCategoryType, IFacility } from '../../../application/types';
import { ActionButtons } from '../ActionButtons';

const columnBuilder = createColumn<IFacility>();
export const useColumns = () => {
  const { formatMessage } = useIntl();

  return [
    columnBuilder.accessor('name', {
      id: 'name',
      cell: props => props.getValue(),
      header: formatMessage({
        id: 'facility-name',
        defaultMessage: 'Facility name',
      }),
      enableSorting: true,
    }),
    columnBuilder.accessor(row => row.contactPerson, {
      id: 'phone',
      header: formatMessage({
        id: 'phone',
        defaultMessage: 'Phone number',
      }),
      cell: props => props.getValue()?.phone ?? '---',
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
    columnBuilder.accessor(row => row.businessCategories, {
      id: 'business-category',
      cell: cell => (
        <Badge variant='subtle' colorScheme='yellow'>
          {cell.getValue().find(category => category.degree === BusinessCategoryDegreeType.Main)?.type ?? BusinessCategoryType.Other}
        </Badge>
      ),
      header: formatMessage({
        id: 'business-category',
        defaultMessage: 'Business category',
      }),
      enableSorting: false,
    }),
    columnBuilder.accessor(row => row.contactPerson, {
      id: 'email',
      header: formatMessage({
        id: 'email',
        defaultMessage: 'Email',
      }),
      cell: props => props.getValue()?.email ?? '---',
      enableSorting: false,
    }),
    columnBuilder.accessor(() => 'buttons', {
      id: 'buttons',
      header: '',
      cell: props => <ActionButtons {...props.row.original.contactPerson} slug={props.row.original.slug} />,
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
  ];
};
