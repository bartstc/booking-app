import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { useAuth } from 'modules/auth/application';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button colorScheme='red' onClick={logout}>
      <FormattedMessage id='log-out' defaultMessage='Logout' />
    </Button>
  );
};

export { LogoutButton };
