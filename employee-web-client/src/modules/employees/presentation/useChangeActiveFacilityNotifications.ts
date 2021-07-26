import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useChangeActiveFacilityNotifications = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'change-active-facility', defaultMessage: 'Change facility' }),
        description: formatMessage({ id: 'change-active-facility-success', defaultMessage: 'Facility successfully changed' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'change-active-facility', defaultMessage: 'Change facility' }),
        description: formatMessage({
          id: 'change-active-facility-failure',
          defaultMessage: 'An error occurred during changing active facility',
        }),
        type: 'error',
      }),
  };
};
