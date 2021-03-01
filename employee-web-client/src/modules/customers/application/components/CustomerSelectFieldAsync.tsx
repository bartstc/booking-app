import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { ICustomerCollection } from 'modules/customers/types';
import { getCustomersKey } from 'modules/customers/infrastructure/query';

import { SelectField, SelectFieldProps } from 'shared/Form/SelectField';
import { useQueryParams } from 'shared/Params';

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable'> & {
  facilityId: string;
};

const CustomerSelectFieldAsync = ({ facilityId, ...props }: IProps) => {
  const { params } = useQueryParams();
  const [selectedOption, selectOption] = useState<OptionType | null>(null);

  const { data, search, nextPage, status } = useAutoComplete<OptionType<string>, ICustomerCollection>({
    url: getCustomersKey(facilityId)[0],
    queryKey: 'fullName',
    params,
    map: ({ collection }) => {
      return collection.map(customer => ({
        label: customer.fullName,
        value: customer.customerId,
      }));
    },
  });

  return (
    <SelectField
      label={<FormattedMessage id='customer' defaultMessage='Customer' />}
      options={data}
      onMenuScrollToBottom={nextPage}
      isLoading={status === RequestStatus.InProgress}
      isClearable
      {...props}
    />
  );
};

export { CustomerSelectFieldAsync };
