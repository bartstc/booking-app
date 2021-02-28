import { useIntl } from 'react-intl';
import { useNotification } from 'hooks';

export const useAddReservationNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'booking-offer', defaultMessage: 'Booking' }),
        description: formatMessage({ id: 'book-offer-success', defaultMessage: 'A new booking has been successfully added' }),
        type: 'success',
      }),
    showFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'booking-offer', defaultMessage: 'Booking' }),
        description: formatMessage({ id: 'book-offer-failure', defaultMessage: 'An error occurred during adding new booking' }),
        type: 'error',
      }),
  };
};
