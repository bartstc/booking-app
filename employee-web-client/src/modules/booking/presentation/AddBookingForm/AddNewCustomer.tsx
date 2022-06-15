import React from 'react';
import { mdiAccount } from '@mdi/js';
import { useIntl } from 'react-intl';

import { IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { IAddCustomerDto } from '../../../customers/application/types';
import { AddCustomerModal, useAddCustomerModalStore } from '../../../customers/presentation';

interface IProps {
  isDisabled: boolean;
  onSuccess: (customerId: string, model: IAddCustomerDto) => void;
}

const AddNewCustomer = ({ isDisabled, onSuccess }: IProps) => {
  const { formatMessage } = useIntl();
  const onOpen = useAddCustomerModalStore(store => store.onOpen);

  return (
    <>
      <IconButton
        colorScheme='primary'
        variant='solid'
        title={formatMessage({
          id: 'add-customer',
          defaultMessage: 'Add customer',
        })}
        icon={<Icon path={mdiAccount} color='gray.800' />}
        onClick={onOpen}
        mt='30.5px !important'
        isDisabled={isDisabled}
      />
      <AddCustomerModal onSuccess={onSuccess} />
    </>
  );
};

export { AddNewCustomer };
