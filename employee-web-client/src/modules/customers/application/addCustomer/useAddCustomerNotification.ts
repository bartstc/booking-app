import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useAddCustomerNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-new-customer', defaultMessage: 'Add new customer' }),
        description: formatMessage({ id: 'add-new-customer-success', defaultMessage: 'New customer added successfully' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-new-customer', defaultMessage: 'Add new customer' }),
        description: formatMessage({ id: 'add-new-customer-failure', defaultMessage: 'An error occurred during adding new customer' }),
        type: 'error',
      }),
  };
};
