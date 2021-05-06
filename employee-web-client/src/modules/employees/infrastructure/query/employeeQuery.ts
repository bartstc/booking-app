import { useSuspense } from 'shared/Suspense';
import { managementHttpService, ServiceType } from 'utils/http';

import { IEmployee } from '../../application/types';

export const employeeQueryKey = (facilityId: string, employeeId: string) => [
  `facilities/${facilityId}/employees/${employeeId}`,
  ServiceType.Management,
];

export const useEmployeeQuery = (facilityId: string, employeeId: string) => {
  return useSuspense(employeeQueryKey(facilityId, employeeId), () =>
    managementHttpService.get<IEmployee>(`facilities/${facilityId}/employees/${employeeId}`),
  ).data;
};
