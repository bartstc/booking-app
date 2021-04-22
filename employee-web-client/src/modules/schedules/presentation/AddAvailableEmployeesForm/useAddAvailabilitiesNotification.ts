import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useAddAvailabilitiesNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-available-hours', defaultMessage: `Add employee's working hours` }),
        description: formatMessage({
          id: 'add-available-hours-failure',
          defaultMessage: 'An error occurred during defining working hours',
        }),
        type: 'error',
      }),
  };
};
