import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useAddOfferNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-new-offer', defaultMessage: 'Add new offer' }),
        description: formatMessage({ id: 'add-new-offer-success', defaultMessage: 'New offer added successfully' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'add-new-offer', defaultMessage: 'Add new offer' }),
        description: formatMessage({ id: 'add-new-offer-failure', defaultMessage: 'An error occurred during adding new offer' }),
        type: 'error',
      }),
  };
};
