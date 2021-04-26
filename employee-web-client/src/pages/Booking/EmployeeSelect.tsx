import React from 'react';
import { Box } from '@chakra-ui/react';
import { OptionType } from 'react-hook-form-chakra-fields';

import { EmployeeSelectInput } from 'modules/employees/presentation/EmployeeSelectInput';
import { useQueryParams } from 'shared/Params';

import { BookingPageQueryParams } from './index';

interface IProps {
  facilityId: string;
}

const EmployeeSelect = ({ facilityId }: IProps) => {
  const { remove, change } = useQueryParams<BookingPageQueryParams>();

  return (
    <Box w='100%' maxW='260px'>
      <EmployeeSelectInput
        facilityId={facilityId}
        onChange={option => {
          if (!option || Array.isArray(option)) {
            return remove('employeeId');
          }

          change('employeeId', (option as OptionType).value);
        }}
      />
    </Box>
  );
};

export { EmployeeSelect };
