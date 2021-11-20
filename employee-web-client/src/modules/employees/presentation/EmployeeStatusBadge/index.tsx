import React from 'react';
import { Badge } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { EmployeeStatus } from '../../application/types';

interface IProps {
  status: EmployeeStatus;
}

const EmployeeStatusBadge = ({ status }: IProps) => {
  return status === EmployeeStatus.Active ? (
    <Badge variant='subtle' colorScheme='green'>
      <FormattedMessage id='active' defaultMessage='Active' />
    </Badge>
  ) : (
    <Badge variant='subtle' colorScheme='red'>
      <FormattedMessage id='inactive' defaultMessage='Inactive' />
    </Badge>
  );
};

export { EmployeeStatusBadge };
