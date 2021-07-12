import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonProps } from '@chakra-ui/react';

import { Button } from 'shared/Button';
import { useAuthContextSelector } from 'modules/auth/application';

interface IProps extends ButtonProps {}

const LoginButton = (props: IProps) => {
  const login = useAuthContextSelector(state => state.login);

  return (
    <Button colorScheme='gray' onClick={login} {...props}>
      <FormattedMessage id='log-in' defaultMessage='Log In' />
    </Button>
  );
};

export { LoginButton };
