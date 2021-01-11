import React from 'react';
import { Spinner as ChakraSpinner, SpinnerProps, Flex } from '@chakra-ui/react';

interface IProps extends SpinnerProps {
  margin?: number;
}

const Spinner = ({ margin = 6, ...props }: IProps) => {
  return (
    <Flex my={margin} align='center' justify='center' width='100%' data-testid='remote-data-suspense-fallback'>
      <ChakraSpinner size='xl' {...props} />
    </Flex>
  );
};

export { Spinner };
