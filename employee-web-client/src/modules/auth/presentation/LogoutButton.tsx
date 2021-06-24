import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'shared/Button';
import { authService } from 'utils/auth';

const LogoutButton = () => {
  return (
    <Button colorScheme='red' onClick={() => authService.logout()}>
      <FormattedMessage id='log-out' defaultMessage='Logout' />
    </Button>
  );
};

export { LogoutButton };
