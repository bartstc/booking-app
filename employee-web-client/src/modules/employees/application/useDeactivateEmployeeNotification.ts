import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useDeactivateEmployeeNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'deactivate-employee', defaultMessage: 'Deactivate employee' }),
        description: formatMessage({ id: 'deactivate-employee-success', defaultMessage: 'Employee was successfully deactivated' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'deactivate-employee', defaultMessage: 'Deactivate employee' }),
        description: formatMessage({ id: 'deactivate-employee-failure', defaultMessage: 'An error occurred during deactivation' }),
        type: 'error',
      }),
  };
};
