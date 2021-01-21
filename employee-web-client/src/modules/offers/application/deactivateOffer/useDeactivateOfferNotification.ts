import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useDeactivateOfferNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'deactivate-offer', defaultMessage: 'Deactivate offer' }),
        description: formatMessage({ id: 'deactivate-offer-success', defaultMessage: 'Offer was successfully deactivated' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'deactivate-offer', defaultMessage: 'Deactivate offer' }),
        description: formatMessage({ id: 'deactivate-offer-failure', defaultMessage: 'An error occurred during deactivation' }),
        type: 'error',
      }),
  };
};
