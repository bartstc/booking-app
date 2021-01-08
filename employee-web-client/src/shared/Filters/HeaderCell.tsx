import React, { ReactNode } from 'react';
import { chakra, ChakraProps, HStack, useTheme, useColorModeValue } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  children: ReactNode;
  name?: string;
}

interface ICell extends ChakraProps {
  children: ReactNode;
}

const Cell = ({ children, ...props }: ICell) => {
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.700', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[500]);

  return (
    <HStack borderBottom={`1px solid ${borderColor}`} {...props} isTruncated>
      <chakra.span fontSize='sm' color={textColor} isTruncated>
        {children}
      </chakra.span>
    </HStack>
  );
};

const HeaderCell = ({ name, ...props }: IProps) => {
  if (name) {
    throw new Error('Not implemented yet');
  }

  return <Cell {...props} />;
};

export { HeaderCell };
