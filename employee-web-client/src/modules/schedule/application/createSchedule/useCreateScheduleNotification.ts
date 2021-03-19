import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useCreateScheduleNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-new-schedule', defaultMessage: 'New schedule' }),
        description: formatMessage({ id: 'create-new-schedule-success', defaultMessage: 'New schedule created successfully' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-new-schedule', defaultMessage: 'New schedule' }),
        description: formatMessage({ id: 'create-new-schedule-failure', defaultMessage: 'An error occurred during creating new schedule' }),
        type: 'error',
      }),
  };
};
