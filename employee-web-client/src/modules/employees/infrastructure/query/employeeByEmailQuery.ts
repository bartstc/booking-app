import { useSuspense } from 'shared/Suspense';
import { managementHttpService, ServiceType } from 'utils/http';

import { IEmployee } from '../../application/types';

export const employeeByEmailQueryKey = (employeeEmail: string) => [`employees/email/${employeeEmail}`, ServiceType.Management];

export const employeeByEmailQuery = (employeeEmail: string) => {
  return managementHttpService.get<IEmployee>(`employees/email/${employeeEmail}`).catch(e => {
    if (e.status === 404) {
      return null;
    }
    throw e;
  });
};

export const useEmployeeByEmailQuery = (employeeEmail: string) => {
  return useSuspense(employeeByEmailQueryKey(employeeEmail), () => employeeByEmailQuery(employeeEmail)).data;
};
