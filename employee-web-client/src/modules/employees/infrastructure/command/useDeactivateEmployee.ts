import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { httpService } from 'utils/http';

import { getEmployeesKey } from '../query';
import { EmployeeStatus, IEmployeeCollection, IEmployeeCollectionQueryParams } from '../../types';

export const useDeactivateEmployee = (facilityId: string, employeeId: string) => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, void>(() =>
    httpService.patch(`facilities/${facilityId}/employees/${employeeId}/deactivate`),
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
              employee.employeeId === employeeId ? { ...employee, status: EmployeeStatus.Inactive } : employee,
            ),
          };
        });
      })
      .catch(e => {
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
