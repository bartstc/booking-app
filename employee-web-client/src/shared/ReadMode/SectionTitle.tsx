import React, { ReactNode } from 'react';
import { Divider, Heading, HeadingProps } from '@chakra-ui/react';

interface IProps extends HeadingProps {
  children: ReactNode | string;
}

const SectionTitle = ({ children, ...props }: IProps) => {
  return (
    <>
      <Heading as='h3' fontSize='xl' {...props}>
        {children}
      </Heading>
      <Divider my={{ base: 3, md: 4 }} />
    </>
  );
};

export { SectionTitle };
