import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { useAuth } from 'modules/auth/application';

const LoginButton = () => {
  const { login } = useAuth();

  return (
    <Button colorScheme='blue' onClick={login}>
      <FormattedMessage id='log-in' defaultMessage='Log In' />
    </Button>
  );
};

export { LoginButton };
