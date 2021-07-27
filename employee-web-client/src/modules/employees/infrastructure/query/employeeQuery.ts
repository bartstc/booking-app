import { useSuspense } from 'shared/Suspense';
import { managementHttpService, ServiceType } from 'utils/http';

import { IEmployee } from '../../application/types';

export const employeeQueryKey = (enterpriseId: string, employeeId: string) => [
  `enterprises/${enterpriseId}/employees/${employeeId}`,
  ServiceType.Management,
];

export const useEmployeeQuery = (enterpriseId: string, employeeId: string) => {
  return useSuspense(employeeQueryKey(enterpriseId, employeeId), () =>
    managementHttpService.get<IEmployee>(`enterprises/${enterpriseId}/employees/${employeeId}`),
  ).data;
};
