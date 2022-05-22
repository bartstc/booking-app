import React, { ReactNode } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

interface IProps extends HeadingProps {
  children: ReactNode | string;
}

const SectionTitle = ({ children, ...props }: IProps) => {
  return (
    <Heading as='h3' fontSize='xl' fontWeight='500' {...props}>
      {children}
    </Heading>
  );
};

export { SectionTitle };
