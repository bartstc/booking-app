import { useCallback } from 'react';
import { useIntl } from 'react-intl';

export const useFormatDateTime = () => {
  const { formatDate } = useIntl();

  return useCallback(
    (date: string | Date | undefined | null, fallback = '---') => {
      if (!date) {
        return fallback;
      }

      return formatDate(date, {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
    [formatDate],
  );
};
