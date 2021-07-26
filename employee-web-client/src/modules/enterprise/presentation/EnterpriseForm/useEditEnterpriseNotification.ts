import { useIntl } from 'react-intl';

import { useNotification } from 'hooks';

export const useEditEnterpriseNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showUpdateSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'update-enterprise', defaultMessage: 'Update enterprise' }),
        description: formatMessage({ id: 'update-enterprise-success', defaultMessage: 'Enterprise updated successfully' }),
        type: 'success',
      }),
    showUpdateFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'update-enterprise', defaultMessage: 'Update enterprise' }),
        description: formatMessage({ id: 'update-enterprise-failure', defaultMessage: 'An error occurred during updating enterprise' }),
        type: 'success',
      }),
    showCreateSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-enterprise', defaultMessage: 'Register enterprise' }),
        description: formatMessage({ id: 'create-enterprise-success', defaultMessage: 'Enterprise registered successfully' }),
        type: 'success',
      }),
    showCreateFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-enterprise', defaultMessage: 'Register enterprise' }),
        description: formatMessage({ id: 'create-enterprise-failure', defaultMessage: 'An error occurred during registering enterprise' }),
        type: 'success',
      }),
  };
};
