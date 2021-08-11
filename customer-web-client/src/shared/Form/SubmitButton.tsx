import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonProps, Button } from '@chakra-ui/react';

interface IProps extends ButtonProps {
  children?: ReactNode | string;
}

const SubmitButton = ({ children = <FormattedMessage id='submit' defaultMessage='Submit' />, ...props }: IProps) => {
  return (
    <Button colorScheme='green' type='submit' {...props}>
      {children}
    </Button>
  );
};

export { SubmitButton };
