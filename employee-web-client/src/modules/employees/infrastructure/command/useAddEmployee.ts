import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { employeesQueryKey } from '../query';
import { IAddEmployeeDto, IEmployeeCollectionQueryParams } from '../../application/types';

export const useAddEmployee = (enterpriseId: string) => {
  const { params } = useQueryParams<IEmployeeCollectionQueryParams>();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ employeeId: string }, IAddEmployeeDto>(model =>
    managementHttpService.post(`enterprises/${enterpriseId}/employees`, model),
  );

  const handler = (model: IAddEmployeeDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(employeesQueryKey(enterpriseId, params));
      })
      .catch(e => {
        if (e.response.message === 'emailInUse') {
          throw new EmailAlreadyExistsError();
        }

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

export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already in use');
  }
}
