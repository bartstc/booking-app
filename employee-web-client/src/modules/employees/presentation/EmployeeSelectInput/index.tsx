import React from 'react';
import { SelectInputProps, SelectInput } from 'react-hook-form-chakra-fields';
import { FormattedMessage } from 'react-intl';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { IEmployee, IEmployeeCollection } from '../../application/types';
import { employeesQueryKey } from '../../infrastructure/query';
import { EmployeeOption } from './EmployeeOption';

export type EmployeeOptionType = OptionType<string> & { employee: IEmployee };

type IProps = Omit<SelectInputProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable' | 'label'> & {
  facilityId: string;
};

const EmployeeSelectInput = ({ facilityId, ...props }: IProps) => {
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

  return (
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
    />
  );
};

export { EmployeeSelectInput };
