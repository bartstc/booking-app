import React, { ReactNode } from 'react';
import { Text, VStack } from '@chakra-ui/react';

interface IProps {
  label: ReactNode | string;
  value?: string[] | number[] | null;
  separator?: string;
}

const ReadModeArrayValue = ({ value, label, separator = ', ' }: IProps) => {
  if (!value?.length) return null;

  return (
    <VStack align='flex-start' spacing={0}>
      <Text color='gray.500' fontSize='sm'>
        {label}
      </Text>
      <Text>{value.join(separator)}</Text>
    </VStack>
  );
};

export { ReadModeArrayValue };
