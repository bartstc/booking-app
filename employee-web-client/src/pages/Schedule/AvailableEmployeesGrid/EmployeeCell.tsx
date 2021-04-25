import React from 'react';
import { Avatar, AvatarBadge, Box, Center, GridItem, HStack, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';

import { EmployeeStatus, IEmployee } from 'modules/employees/application/types';

interface IProps {
  employee: IEmployee;
}

const EmployeeCell = ({ employee }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const avatarBg = useColorModeValue('gray.300', 'gray.600');

  return (
    <GridItem
      as={Center}
      colSpan={1}
      justifyContent='flex-start'
      fontWeight='700'
      p={2}
      border={`1px solid ${borderColor}`}
      borderTop='none'
    >
      <HStack spacing={3}>
        <Avatar bg={avatarBg} size='sm'>
          <AvatarBadge boxSize='1.1em' bg={employee.status === EmployeeStatus.Active ? 'green.300' : 'red.300'} />
        </Avatar>
        <VStack align='flex-start' spacing={1}>
          <Box lineHeight='.9rem' fontSize='sm'>
            {employee.name}
          </Box>
          <Box fontSize='xs' color='gray.500'>
            {employee.position}
          </Box>
        </VStack>
      </HStack>
    </GridItem>
  );
};

export { EmployeeCell };
