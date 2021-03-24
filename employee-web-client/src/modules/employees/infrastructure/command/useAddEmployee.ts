import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';

import { IAddEmployeeDto } from '../../dto';
import { employeesQueryKey } from '../query';

export const useAddEmployee = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ employeeId: string }, IAddEmployeeDto>(model =>
    managementHttpService.post(`facilities/${facilityId}/employees`, model),
  );

  const handler = (model: IAddEmployeeDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(employeesQueryKey(facilityId));
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
