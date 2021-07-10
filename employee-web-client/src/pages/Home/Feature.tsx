import React, { ReactNode } from 'react';
import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';

interface IProps {
  children: ReactNode | string;
}

const Feature = ({ children }: IProps) => {
  const color = useColorModeValue('inherit', 'white');

  return (
    <Flex alignItems='center' color={color}>
      <Icon boxSize={4} mr={1} color='green.600' viewBox='0 0 20 20' fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
          clipRule='evenodd'
        ></path>
      </Icon>
      {children}
    </Flex>
  );
};

export { Feature };
