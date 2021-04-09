import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useActivateOfferNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'activate-offer', defaultMessage: 'Activate offer' }),
        description: formatMessage({ id: 'activate-offer-success', defaultMessage: 'Offer was successfully activated' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'activate-offer', defaultMessage: 'Deactivate offer' }),
        description: formatMessage({ id: 'activate-offer-failure', defaultMessage: 'An error occurred during activation' }),
        type: 'error',
      }),
  };
};
