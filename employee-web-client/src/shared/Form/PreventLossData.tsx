import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { EventType, useEventListener } from 'hooks';

const PreventLossData = () => {
  const {
    formState: { isDirty },
  } = useFormContext();
  const { formatMessage } = useIntl();
  const { block } = useHistory();

  useEffect(() => {
    const unblock = block(() => {
      if (isDirty) {
        return formatMessage({ id: 'prevent-loss-date-warning', defaultMessage: 'Form data will be lost. Are you sure?' });
      }
    });

    return () => unblock();
  }, [isDirty]);

  const handler = useCallback(
    (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    },
    [isDirty],
  );

  useEventListener(EventType.BeforeUnload, handler);

  return null;
};

export { PreventLossData };
