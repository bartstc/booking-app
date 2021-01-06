import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ChakraProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Button } from '../Button';

const HomeButton = (props: ChakraProps) => {
  return (
    <Link to='/'>
      <Button colorScheme='primary' {...props}>
        <FormattedMessage id='home-page-back' defaultMessage='Back to home page' />
      </Button>
    </Link>
  );
};

export { HomeButton };
