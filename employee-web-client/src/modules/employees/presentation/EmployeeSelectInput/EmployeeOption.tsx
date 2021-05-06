import React, { memo } from 'react';
import { components, OptionProps } from 'react-select';
import { VStack, HStack, Avatar, AvatarBadge, Box } from '@chakra-ui/react';

import { EmployeeStatus, IEmployee } from '../../application/types';
import { EmployeeOptionType } from './index';

interface EmployeeOptionProps extends OptionProps<EmployeeOptionType, false> {}

// eslint-disable-next-line react/display-name
const EmployeeOption = memo(
  (props: EmployeeOptionProps) => {
    const employee: IEmployee = props.data.employee;

    return (
      <components.Option {...props}>
        <HStack mb={1} spacing={3}>
          <Avatar name={employee.name} size='sm'>
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
      </components.Option>
    );
  },
  () => false,
);

export { EmployeeOption };
