import React, { ReactNode } from 'react';
import { Text, VStack } from '@chakra-ui/react';

const ReadModeValue = ({ value, label }: { value?: string | number; label: ReactNode | string }) => {
  if (!value) return null;

  return (
    <VStack align='flex-start' spacing={0}>
      <Text color='gray.500' fontSize='sm'>
        {label}
      </Text>
      <Text>{value}</Text>
    </VStack>
  );
};

export { ReadModeValue };
