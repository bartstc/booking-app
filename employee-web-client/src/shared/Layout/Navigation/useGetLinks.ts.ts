import { useIntl } from 'react-intl';
import { mdiAccountMultiple, mdiBookMultiple, mdiCalendar, mdiCogs, mdiLan } from '@mdi/js';

export const useGetLinks = () => {
  const { formatMessage } = useIntl();

  return [
    {
      path: mdiCalendar,
      label: formatMessage({
        id: 'schedule',
        defaultMessage: 'Schedule',
      }),
      to: 'schedule',
    },
    {
      path: mdiAccountMultiple,
      label: formatMessage({
        id: 'customers',
        defaultMessage: 'Customers',
      }),
      to: 'customers',
    },

    {
      path: mdiLan,
      label: formatMessage({
        id: 'employees',
        defaultMessage: 'Employees',
      }),
      to: 'employees',
    },
    {
      path: mdiBookMultiple,
      label: formatMessage({
        id: 'offers',
        defaultMessage: 'Offers',
      }),
      to: 'offers',
    },
    {
      path: mdiCogs,
      label: formatMessage({
        id: 'settings',
        defaultMessage: 'Settings',
      }),
      to: 'settings',
    },
  ];
};
