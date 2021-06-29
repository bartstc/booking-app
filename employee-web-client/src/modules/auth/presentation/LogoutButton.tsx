import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { useAuthContextSelector } from 'modules/auth/application';

const LogoutButton = () => {
  const logout = useAuthContextSelector(state => state.logout);

  return (
    <Button colorScheme='red' onClick={logout}>
      <FormattedMessage id='log-out' defaultMessage='Logout' />
    </Button>
  );
};

export { LogoutButton };
