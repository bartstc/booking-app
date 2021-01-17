import { useIntl } from 'react-intl';

export const useRequiredFieldMessage = () => {
  const { formatMessage } = useIntl();

  return formatMessage({
    id: 'validation.message.required',
    defaultMessage: 'Field is required',
  });
};
