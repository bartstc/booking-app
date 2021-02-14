import { useIntl } from 'react-intl';

export const useInvalidFormatFieldMessage = () => {
  const { formatMessage } = useIntl();

  return formatMessage({ id: 'invalid-format', defaultMessage: 'Invalid format' });
};
