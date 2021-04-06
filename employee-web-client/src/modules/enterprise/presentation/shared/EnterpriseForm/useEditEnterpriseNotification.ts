import { useIntl } from 'react-intl';

import { useNotification } from 'hooks';

export const useEditEnterpriseNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showUpdateSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-enterprise', defaultMessage: 'Update enterprise' }),
        description: formatMessage({ id: 'update-enterprise-success', defaultMessage: 'Enterprise updated successfully' }),
        type: 'success',
      }),
    showUpdateFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-enterprise', defaultMessage: 'Update enterprise' }),
        description: formatMessage({ id: 'update-enterprise-failure', defaultMessage: 'An error occurred during updating enterprise' }),
        type: 'success',
      }),
  };
};
