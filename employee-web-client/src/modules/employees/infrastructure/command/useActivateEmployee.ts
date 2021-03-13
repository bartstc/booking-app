import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { getEmployeesKey } from '../query';
import { EmployeeStatus, IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../types';

export const useActivateEmployee = (facilityId: string, employeeId: string) => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, void>(() =>
    managementHttpService.patch(`facilities/${facilityId}/employees/${employeeId}/activate`),
  );

  const handler = () => {
    return mutateAsync()
      .then(async () => {
        await queryClient.setQueryData(getEmployeesKey(facilityId, params), (data?: IEmployeeCollection) => {
          if (!data) {
            throw new Error(`Cache is empty for given key: ${getEmployeesKey(facilityId, params)}`);
          }

          return {
            ...data,
            collection: data.collection.map(employee =>
              employee.employeeId === employeeId ? { ...employee, status: EmployeeStatus.Active } : employee,
            ),
          };
        });
      })
      .catch(e => {
        Logger.log({
          name: e.name,
          message: JSON.stringify(e),
          level: LogLevel.Error,
        });
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
