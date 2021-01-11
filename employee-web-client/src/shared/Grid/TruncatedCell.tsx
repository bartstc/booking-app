import React, { ReactNode } from 'react';
import { Text, Flex, FlexProps } from '@chakra-ui/react';

interface IProps extends FlexProps {
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
