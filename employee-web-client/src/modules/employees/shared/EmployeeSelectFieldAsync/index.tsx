import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { SelectField, SelectFieldProps } from 'shared/Form/SelectField';

import { IEmployeeCollection } from '../../types';
import { getEmployeesKey } from '../../infrastructure/query';

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable' | 'label'> & {
  facilityId: string;
};

const EmployeeSelectFieldAsync = ({ facilityId, ...props }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<OptionType<string>, IEmployeeCollection>({
    url: getEmployeesKey(facilityId)[0],
    map: ({ collection }) => {
      return collection.map(employee => ({
        label: employee.name,
        value: employee.employeeId,
      }));
    },
  });

  return (
    <SelectField
      label={<FormattedMessage id='employee' defaultMessage='Employee' />}
      options={data}
      onMenuScrollToBottom={nextPage}
      onInputChange={value => search(value)}
      isLoading={status === RequestStatus.InProgress}
      isClearable
      {...props}
    />
  );
};

export { EmployeeSelectFieldAsync };
