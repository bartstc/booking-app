import { useIntl } from 'react-intl';

import { useNotification } from 'hooks';

export const useCreateEnterpriseNotification = () => {
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  return {
    showCreateSuccessNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-enterprise', defaultMessage: 'Create enterprise' }),
        description: formatMessage({ id: 'create-enterprise-success', defaultMessage: 'New enterprise created successfully' }),
        type: 'success',
      }),
    showCreateFailureNotification: () =>
      addNotification({
        title: formatMessage({ id: 'create-enterprise', defaultMessage: 'Create enterprise' }),
        description: formatMessage({ id: 'create-enterprise-failure', defaultMessage: 'An error occurred during creating enterprise' }),
        type: 'error',
      }),
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
