import React, { ReactNode } from 'react';
import { Divider, Heading, HeadingProps, useColorModeValue } from '@chakra-ui/react';

interface IProps extends HeadingProps {
  children: ReactNode | string;
}

const SectionTitle = ({ children, ...props }: IProps) => {
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <>
      <Heading color={color} as='h3' fontSize='xl' {...props}>
        {children}
      </Heading>
      <Divider mt={2} mb={{ base: 3, md: 4 }} />
    </>
  );
};

export { SectionTitle };
