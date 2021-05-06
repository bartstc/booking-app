import React from 'react';
import { Box } from '@chakra-ui/react';
import { OptionType, SelectInput, SelectInputProps } from 'react-hook-form-chakra-fields';
import { FormattedMessage } from 'react-intl';

import { useQueryParams } from 'shared/Params';

import { useAutoComplete } from 'hooks';
import { RequestStatus } from 'types';

import { IEmployee, IEmployeeCollection } from 'modules/employees/application/types';
import { employeesQueryKey } from 'modules/employees/infrastructure/query';
import { EmployeeOption } from 'modules/employees/presentation';

import { BookingPageQueryParams } from './index';

export type EmployeeOptionType = OptionType<string> & { employee: IEmployee };

type IProps = Omit<SelectInputProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable' | 'label'> & {
  facilityId: string;
};

const EmployeeSelect = ({ facilityId, ...props }: IProps) => {
  const { remove, change, params } = useQueryParams<BookingPageQueryParams>();

  const { data, search, nextPage, status } = useAutoComplete<EmployeeOptionType, IEmployeeCollection>({
    url: employeesQueryKey(facilityId)[0],
    map: ({ collection }) => {
      return collection.map(employee => ({
        label: employee.name,
        value: employee.employeeId,
        employee,
      }));
    },
  });

  // todo: by default search for current employee id and set inside select

  return (
    <Box w='100%' maxW='260px'>
      <SelectInput
        placeholder={<FormattedMessage id='select-employee' defaultMessage='Select employee' />}
        options={data}
        onMenuScrollToBottom={nextPage}
        onInputChange={value => search(value)}
        isLoading={status === RequestStatus.InProgress}
        {...props}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Option: EmployeeOption as any,
        }}
        value={data.find(employee => employee.value === params.employeeId) ?? null}
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
