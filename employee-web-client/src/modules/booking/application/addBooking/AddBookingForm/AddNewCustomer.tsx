import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { mdiAccount } from '@mdi/js';
import { useIntl } from 'react-intl';

import { IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { IAddCustomerDto } from '../../../../customers/application/types';
import { AddCustomerModal } from '../../../../customers/presentation/shared/AddCustomerModal';

interface IProps {
  isDisabled: boolean;
  onSuccess: (customerId: string, model: IAddCustomerDto) => void;
}

const AddNewCustomer = ({ isDisabled, onSuccess }: IProps) => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <AddCustomerModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
    </>
  );
};

export { AddNewCustomer };
