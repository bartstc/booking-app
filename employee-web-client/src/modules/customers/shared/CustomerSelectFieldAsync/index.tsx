import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SelectField, SelectFieldProps } from 'react-hook-form-chakra-fields';
import { uniqBy } from 'lodash';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { ICustomer, ICustomerCollection } from 'modules/customers/types';
import { customersQueryKey } from 'modules/customers/infrastructure/query';

import { CustomerOption } from './CustomerOption';

export type SelectedCustomerOption = OptionType<string> & { customer: ICustomer };

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'label'> & {
  facilityId: string;
  newOptions?: SelectedCustomerOption[];
};

const CustomerSelectFieldAsync = ({ facilityId, newOptions = [], isClearable = true, ...props }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<SelectedCustomerOption, ICustomerCollection>({
    url: customersQueryKey(facilityId)[0],
    queryKey: 'fullName',
    map: ({ collection }) => {
      return collection.map(customer => ({
        label: customer.fullName,
        value: customer.customerId,
        customer,
      }));
    },
  });

  return (
    <SelectField
      label={<FormattedMessage id='customer' defaultMessage='Customer' />}
      options={uniqBy([...data, ...newOptions], 'value')}
      onMenuScrollToBottom={nextPage}
      onInputChange={value => search(value)}
      isLoading={status === RequestStatus.InProgress}
      isClearable={isClearable}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Option: CustomerOption as any,
      }}
      {...props}
    />
  );
};

export { CustomerSelectFieldAsync };
