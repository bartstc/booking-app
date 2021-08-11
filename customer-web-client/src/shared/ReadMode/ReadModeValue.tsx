import React, { ReactNode } from 'react';
import { Text, VStack, StackProps, useColorModeValue } from '@chakra-ui/react';

interface IProps extends StackProps {
  value?: string | number | null;
  label: ReactNode | string;
}

const ReadModeValue = ({ value, label, ...props }: IProps) => {
  const color = useColorModeValue('gray.500', 'gray.400');

  if (!value) return null;

  return (
    <VStack align='flex-start' spacing={0} {...props}>
      <Text color={color} fontSize='sm'>
        {label}
      </Text>
      <Text>{value}</Text>
    </VStack>
  );
};

export { ReadModeValue };
