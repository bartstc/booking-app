import { useIntl } from 'react-intl';

import { useNotification } from 'hooks';

export const useActivateEmployeeNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'activate-employee', defaultMessage: 'Activate employee' }),
        description: formatMessage({ id: 'activate-employee-success', defaultMessage: 'Employee was successfully activated' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'activate-employee', defaultMessage: 'Deactivate employee' }),
        description: formatMessage({ id: 'activate-employee-failure', defaultMessage: 'An error occurred during activation' }),
        type: 'error',
      }),
  };
};
