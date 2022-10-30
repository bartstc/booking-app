import { useCallback } from 'react';
import formatDate from 'intl-dateformat';

export const useFormatDate = () => {
  return useCallback(
    (date: string | Date | undefined | null, format = 'YYYY-MM-DD', fallback = '---') => {
      if (!date) return fallback;

      return formatDate(new Date(date), format);
    },
    [formatDate],
  );
};
