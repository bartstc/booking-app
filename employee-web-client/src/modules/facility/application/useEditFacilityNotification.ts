import { useIntl } from 'react-intl';

import { useNotification } from 'hooks';

export const useEditFacilityNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showEditSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-facility', defaultMessage: 'Update facility' }),
        description: formatMessage({ id: 'update-facility-success', defaultMessage: 'Facility updated successfully' }),
        type: 'success',
      }),
    showEditFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-facility', defaultMessage: 'Update facility' }),
        description: formatMessage({ id: 'update-facility-failure', defaultMessage: 'An error occurred during updating facility' }),
        type: 'success',
      }),
  };
};
