import React from 'react';

import { useFacilityContextSelector } from 'modules/context';

import { EmployeeStatus } from '../../../application/types';
import { DeactivateEmployeeIconButton } from '../../DeactivateEmployeeIconButton';
import { ActivateEmployeeIconButton } from '../../ActivateEmployeeIconButton';

interface IProps {
  employeeId: string;
  status: EmployeeStatus;
}

const StatusActionButtons = ({ employeeId, status }: IProps) => {
  const { facilityId } = useFacilityContextSelector();

  if (status === EmployeeStatus.Inactive) {
    return <ActivateEmployeeIconButton facilityId={facilityId} employeeId={employeeId} />;
  }

  return <DeactivateEmployeeIconButton facilityId={facilityId} employeeId={employeeId} />;
};

export { StatusActionButtons };
