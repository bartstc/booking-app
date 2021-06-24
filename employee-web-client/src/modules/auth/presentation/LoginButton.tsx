import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { authService } from 'utils/auth';

const LoginButton = () => {
  return (
    <Button colorScheme='blue' onClick={() => authService.login()}>
      <FormattedMessage id='log-in' defaultMessage='Log In' />
    </Button>
  );
};

export { LoginButton };
