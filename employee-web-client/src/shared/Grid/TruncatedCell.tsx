import React, { ReactNode } from 'react';
import { Text, Flex, ChakraProps } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode | string;
}

const TruncatedCell = ({ children, ...props }: IProps) => {
  return (
    <Flex isTruncated className='cell' {...props}>
      <Text isTruncated>{children}</Text>
    </Flex>
  );
};

export { TruncatedCell };
