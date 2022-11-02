import { useIntl } from 'react-intl';
import { mdiAccountMultiple, mdiBookMultiple, mdiCalendarCheck, mdiClipboardTextSearch, mdiCalendarWeek, mdiLan } from '@mdi/js';

export const useGetLinks = () => {
  const { formatMessage } = useIntl();

  return [
    {
      path: mdiClipboardTextSearch,
      label: formatMessage({
        id: 'dashboard',
        defaultMessage: 'Dashboard',
      }),
      to: 'dashboard/enterprise',
      signature: 'dashboard',
    },
    {
      path: mdiCalendarWeek,
      label: formatMessage({
        id: 'schedules',
        defaultMessage: 'Schedules',
      }),
      to: 'schedules',
      signature: 'schedules',
    },
    {
      path: mdiCalendarCheck,
      label: formatMessage({
        id: 'bookings',
        defaultMessage: 'Bookings',
      }),
      to: 'bookings',
      signature: 'booking',
    },
    {
      path: mdiAccountMultiple,
      label: formatMessage({
        id: 'customers',
        defaultMessage: 'Customers',
      }),
      to: 'customers',
      signature: 'customers',
    },
    {
      path: mdiLan,
      label: formatMessage({
        id: 'employees',
        defaultMessage: 'Employees',
      }),
      to: 'employees',
      signature: 'employees',
    },
    {
      path: mdiBookMultiple,
      label: formatMessage({
        id: 'offers',
        defaultMessage: 'Offers',
      }),
      to: 'offers',
      signature: 'offers',
    },
  ];
};
