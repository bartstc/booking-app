import { useQueryClient } from 'react-query';

import { httpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';

import { IAddEmployeeDto } from '../../dto';
import { getEmployeesKey } from '../query';

export const useAddEmployee = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ employeeId: string }, IAddEmployeeDto>(model =>
    httpService.post(`facilities/${facilityId}/employees`, model),
  );

  const handler = (model: IAddEmployeeDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(getEmployeesKey(facilityId)[0]);
      })
      .catch(e => {
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
