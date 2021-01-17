import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useAddEmployeeNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-new-employee', defaultMessage: 'Add new employee' }),
        description: formatMessage({ id: 'add-new-employee-success', defaultMessage: 'New employee added successfully' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-new-employee', defaultMessage: 'Add new employee' }),
        description: formatMessage({ id: 'add-new-employee-failure', defaultMessage: 'An error occurred during adding new employee' }),
        type: 'error',
      }),
  };
};
