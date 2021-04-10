import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { employeesQueryKey } from '../query';
import { IAddEmployeeDto, IEmployeeCollectionQueryParams } from '../../application/types';

export const useAddEmployee = (facilityId: string) => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ employeeId: string }, IAddEmployeeDto>(model =>
    managementHttpService.post(`facilities/${facilityId}/employees`, model),
  );

  const handler = (model: IAddEmployeeDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(employeesQueryKey(facilityId, params));
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
