import React from 'react';
import { FormattedMessage } from 'react-intl';
import { uniqBy } from 'lodash';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { ICustomer, ICustomerCollection } from 'modules/customers/types';
import { getCustomersKey } from 'modules/customers/infrastructure/query';

import { SelectField, SelectFieldProps } from 'shared/Form/SelectField';
import { CustomerOption } from './CustomerOption';

export type SelectedCustomerOption = OptionType<string> & { customer: ICustomer };

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable' | 'label'> & {
  facilityId: string;
  newOptions?: SelectedCustomerOption[];
};

const CustomerSelectFieldAsync = ({ facilityId, newOptions = [], ...props }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<SelectedCustomerOption, ICustomerCollection>({
    url: getCustomersKey(facilityId)[0],
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
      isClearable
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Option: CustomerOption as any,
      }}
      {...props}
    />
  );
};

export { CustomerSelectFieldAsync };
