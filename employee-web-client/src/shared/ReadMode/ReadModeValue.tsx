import React, { ReactNode } from 'react';
import { Text, VStack, StackProps } from '@chakra-ui/react';

interface IProps extends StackProps {
  value?: string | number | null;
  label: ReactNode | string;
}

const ReadModeValue = ({ value, label, ...props }: IProps) => {
  if (!value) return null;

  return (
    <VStack align='flex-start' spacing={0} {...props}>
      <Text color='gray.500' fontSize='sm'>
        {label}
      </Text>
      <Text>{value}</Text>
    </VStack>
  );
};

export { ReadModeValue };
