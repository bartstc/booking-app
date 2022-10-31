import { useIntl } from 'react-intl';

import { createColumn } from 'shared/Table';
import { useFormatDate } from 'shared/DateV2';

import { ISchedule } from '../../../application/types';

const columnBuilder = createColumn<ISchedule>();

export const useColumns = () => {
  const { formatMessage } = useIntl();
  const formatDate = useFormatDate();

  return [
    columnBuilder.accessor('name', {
      id: 'name',
      cell: props => props.getValue(),
      header: formatMessage({
        id: 'schedule-name',
        defaultMessage: 'Schedule name',
      }),
      enableSorting: false,
    }),
    columnBuilder.accessor('startDate', {
      id: 'start-date',
      header: formatMessage({
        id: 'start-date',
        defaultMessage: 'Start date',
      }),
      cell: props => formatDate(props.getValue(), 'DD MMM YYYY'),
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
    columnBuilder.accessor('endDate', {
      id: 'end-date',
      header: formatMessage({
        id: 'end-date',
        defaultMessage: 'End date',
      }),
      cell: props => formatDate(props.getValue(), 'DD MMM YYYY'),
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
    columnBuilder.accessor('creationDate', {
      id: 'creation-date',
      header: formatMessage({
        id: 'created-at',
        defaultMessage: 'Created at',
      }),
      cell: props => formatDate(props.getValue(), 'DD MMM YYYY'),
      enableSorting: false,
      meta: {
        isNumeric: true,
      },
    }),
  ];
};
