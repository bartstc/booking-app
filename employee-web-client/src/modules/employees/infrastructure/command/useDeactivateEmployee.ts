import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { employeesQueryKey } from '../query';
import { EmployeeStatus, IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../application/types';

export const useDeactivateEmployee = (enterpriseId: string, employeeId: string) => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, void>(() =>
    managementHttpService.patch(`enterprises/${enterpriseId}/employees/${employeeId}/deactivate`),
  );

  const handler = () => {
    return mutateAsync()
      .then(async () => {
        await queryClient.setQueryData(employeesQueryKey(enterpriseId, params), (data?: IEmployeeCollection) => {
          if (!data) {
            throw new Error(`Cache is empty for given key: ${employeesQueryKey(enterpriseId, params)}`);
          }

          return {
            ...data,
            collection: data.collection.map(employee =>
              employee.employeeId === employeeId ? { ...employee, status: EmployeeStatus.Inactive } : employee,
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
