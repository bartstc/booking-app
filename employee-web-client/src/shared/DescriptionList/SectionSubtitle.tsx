import React, { ReactNode } from 'react';
import { useColorModeValue, Text, TextProps } from '@chakra-ui/react';

interface IProps extends TextProps {
  children: ReactNode | string;
}

const SectionSubtitle = ({ children, ...props }: IProps) => {
  const color = useColorModeValue('gray.500', 'gray.400');

  return (
    <Text color={color} fontSize='sm' {...props}>
      {children}
    </Text>
  );
};

export { SectionSubtitle };
