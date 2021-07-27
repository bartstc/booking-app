import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';

import { IEnterprise, IUpdateEnterpriseDto } from '../../application/types';
import { enterpriseByOwnerIdQueryKey } from '../query';

export const useCreateEnterprise = (ownerId: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<{ enterpriseId: string }, IUpdateEnterpriseDto>(model => {
    return managementHttpService.post(`enterprises`, { ...model, ownerId });
  });

  const handler = (model: IUpdateEnterpriseDto) => {
    return mutateAsync(model)
      .then(async ({ enterpriseId }) => {
        await queryClient.setQueryData<IEnterprise | undefined>(enterpriseByOwnerIdQueryKey(ownerId), () => {
          return {
            enterpriseId,
            ownerId,
            ...model,
          } as IEnterprise;
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
