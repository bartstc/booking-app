import { useIntl } from 'react-intl';
import { mdiAccountMultiple, mdiBookMultiple, mdiCalendar, mdiClipboardTextSearch, mdiCogs, mdiLan } from '@mdi/js';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

export const useGetLinks = () => {
  const { formatMessage } = useIntl();

  return [
    {
      path: mdiClipboardTextSearch,
      label: formatMessage({
        id: 'enterprise-overview',
        defaultMessage: 'Overview',
      }),
      to: buildUrl('overview', DEFAULT_PARAMS),
    },
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
      to: buildUrl('customers', DEFAULT_PARAMS),
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
