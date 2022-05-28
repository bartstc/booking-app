import React, { ReactNode } from 'react';
import { Heading as ChHeading, HeadingProps } from '@chakra-ui/react';

interface IProps extends HeadingProps {
  children: ReactNode | string;
}

const Heading = ({ children, ...props }: IProps) => {
  return (
    <ChHeading as='h3' fontSize='xl' fontWeight='500' {...props}>
      {children}
    </ChHeading>
  );
};

export { Heading };
