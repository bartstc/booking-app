import React from 'react';

import { useFacilityConsumer } from 'modules/context';
import { EmployeeStatus } from 'modules/employees/types';
import { useActivateEmployee, useDeactivateEmployee } from 'modules/employees/infrastructure/command';
import { DeactivateEmployeeIconButton } from 'modules/employees/application/deactivateEmployee';
import { ActivateEmployeeIconButton } from 'modules/employees/application/activateEmployee';

interface IProps {
  employeeId: string;
  status: EmployeeStatus;
}

const StatusActionButtons = ({ employeeId, status }: IProps) => {
  const { facilityId } = useFacilityConsumer();
  const [deactivate, isDeactivating] = useDeactivateEmployee(facilityId, employeeId);
  const [activate, isActivating] = useActivateEmployee(facilityId, employeeId);

  if (status === EmployeeStatus.Inactive) {
    return <ActivateEmployeeIconButton isLoading={isActivating} onClick={activate} />;
  }

  return <DeactivateEmployeeIconButton isLoading={isDeactivating} onClick={deactivate} />;
};

export { StatusActionButtons };
