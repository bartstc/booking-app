import React from 'react';

import { useFacilityConsumer } from 'modules/context';
import { EmployeeStatus } from 'modules/employees/types';
import { DeactivateEmployeeIconButton } from 'modules/employees/application/deactivateEmployee';
import { ActivateEmployeeIconButton } from 'modules/employees/application/activateEmployee';

interface IProps {
  employeeId: string;
  status: EmployeeStatus;
}

const StatusActionButtons = ({ employeeId, status }: IProps) => {
  const { facilityId } = useFacilityConsumer();

  if (status === EmployeeStatus.Inactive) {
    return <ActivateEmployeeIconButton facilityId={facilityId} employeeId={employeeId} />;
  }

  return <DeactivateEmployeeIconButton facilityId={facilityId} employeeId={employeeId} />;
};

export { StatusActionButtons };
