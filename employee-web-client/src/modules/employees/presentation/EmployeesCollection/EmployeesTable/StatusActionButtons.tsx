import React from 'react';

import { useEnterpriseContextSelector } from 'modules/context';

import { EmployeeStatus } from '../../../application/types';
import { DeactivateEmployeeIconButton } from '../../DeactivateEmployeeIconButton';
import { ActivateEmployeeIconButton } from '../../ActivateEmployeeIconButton';

interface IProps {
  employeeId: string;
  status: EmployeeStatus;
}

const StatusActionButtons = ({ employeeId, status }: IProps) => {
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);

  if (status === EmployeeStatus.Inactive) {
    return <ActivateEmployeeIconButton enterpriseId={enterpriseId} employeeId={employeeId} />;
  }

  return <DeactivateEmployeeIconButton enterpriseId={enterpriseId} employeeId={employeeId} />;
};

export { StatusActionButtons };
