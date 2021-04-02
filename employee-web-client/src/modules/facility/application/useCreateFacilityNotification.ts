import { useIntl } from 'react-intl';

import { useNotification } from 'hooks';

export const useCreateFacilityNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showCreateSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-facility', defaultMessage: 'Create facility' }),
        description: formatMessage({ id: 'create-facility-success', defaultMessage: 'New facility created successfully' }),
        type: 'success',
      }),
    showCreateFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-facility', defaultMessage: 'Create facility' }),
        description: formatMessage({ id: 'create-facility-failure', defaultMessage: 'An error occurred during creating facility' }),
        type: 'error',
      }),
  };
};
