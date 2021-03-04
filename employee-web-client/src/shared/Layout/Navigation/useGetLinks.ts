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
        id: 'dashboard',
        defaultMessage: 'Dashboard',
      }),
      to: 'dashboard/enterprise',
      signature: 'dashboard',
    },
    {
      path: mdiCalendar,
      label: formatMessage({
        id: 'schedule',
        defaultMessage: 'Schedule',
      }),
      to: 'schedule',
      signature: 'schedule',
    },
    {
      path: mdiAccountMultiple,
      label: formatMessage({
        id: 'customers',
        defaultMessage: 'Customers',
      }),
      to: buildUrl('customers', DEFAULT_PARAMS),
      signature: 'customers',
    },

    {
      path: mdiLan,
      label: formatMessage({
        id: 'employees',
        defaultMessage: 'Employees',
      }),
      to: buildUrl('employees', DEFAULT_PARAMS),
      signature: 'employees',
    },
    {
      path: mdiBookMultiple,
      label: formatMessage({
        id: 'offers',
        defaultMessage: 'Offers',
      }),
      to: buildUrl('offers', DEFAULT_PARAMS),
      signature: 'offers',
    },
  ];
};
