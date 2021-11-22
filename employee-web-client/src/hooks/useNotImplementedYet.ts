import { useIntl } from 'react-intl';

import { useNotification } from './useNotification';

export const useNotImplementedYet = (title?: string) => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return () =>
    addNotification({
      title: title ?? formatMessage({ id: 'not-implemented-yet-title', defaultMessage: 'Feature' }),
      description: formatMessage({ id: 'not-implemented-yet-description', defaultMessage: 'Not implemented yet' }),
      type: 'info',
    });
};
