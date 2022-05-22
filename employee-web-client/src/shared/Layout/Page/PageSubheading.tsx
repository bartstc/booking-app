import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface IProps extends TextProps {}

const PageSubheading = ({ children, ...props }: IProps) => {
  return (
    <Text as='h2' lineHeight={4} {...props}>
      {children}
    </Text>
  );
};

export { PageSubheading };
