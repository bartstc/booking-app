import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { useAuthContextSelector } from 'modules/auth/application';

const LoginButton = () => {
  const login = useAuthContextSelector(state => state.login);

  return (
    <Button colorScheme='blue' onClick={login}>
      <FormattedMessage id='log-in' defaultMessage='Log In' />
    </Button>
  );
};

export { LoginButton };
