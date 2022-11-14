import React from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

interface IProps extends HeadingProps {}

const PageHeading = ({ children, ...props }: IProps) => {
  return (
    <Heading as='h1' fontWeight='600' {...props}>
      {children}
    </Heading>
  );
};

export { PageHeading };
