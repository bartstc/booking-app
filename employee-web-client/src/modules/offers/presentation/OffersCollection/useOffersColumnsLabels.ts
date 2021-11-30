import { useIntl } from 'react-intl';

export const useOffersColumnsLabels = () => {
  const { formatMessage } = useIntl();

  return {
    name: formatMessage({ id: 'offer-name', defaultMessage: 'Offer name' }),
    status: formatMessage({ id: 'offer-status', defaultMessage: 'Status' }),
    duration: formatMessage({ id: 'duration', defaultMessage: 'Duration' }),
    price: formatMessage({ id: 'price', defaultMessage: 'Price' }),
    priceType: formatMessage({ id: 'price-type', defaultMessage: 'Price type' }),
  };
};
