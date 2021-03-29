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
    showUpdateSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-facility', defaultMessage: 'Update facility' }),
        description: formatMessage({ id: 'update-facility-success', defaultMessage: 'Facility updated successfully' }),
        type: 'success',
      }),
    showUpdateFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-facility', defaultMessage: 'Update facility' }),
        description: formatMessage({ id: 'update-facility-failure', defaultMessage: 'An error occurred during updating facility' }),
        type: 'success',
      }),
  };
};
