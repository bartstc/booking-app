import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

interface IProps extends FlexProps {}

const PageHeader = ({ children, ...props }: IProps) => {
  return (
    <Flex w='100%' justify='space-between' {...props}>
      {children}
    </Flex>
  );
};

export { PageHeader };
