import React, { ReactNode } from 'react';
import { Text, useColorModeValue, VStack } from '@chakra-ui/react';

interface IProps {
  label: ReactNode | string;
  value?: string[] | number[] | null;
  separator?: string;
}

const ReadModeArrayValue = ({ value, label, separator = ', ' }: IProps) => {
  const color = useColorModeValue('gray.500', 'gray.400');

  if (!value?.length) return null;

  return (
    <VStack align='flex-start' spacing={0}>
      <Text color={color} fontSize='sm'>
        {label}
      </Text>
      <Text>{value.join(separator)}</Text>
    </VStack>
  );
};

export { ReadModeArrayValue };
