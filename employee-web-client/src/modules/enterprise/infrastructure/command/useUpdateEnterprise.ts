import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';

import { enterpriseQueryKey } from '../query';
import { IEnterprise, IUpdateEnterpriseDto } from '../../application/types';

export const useUpdateEnterprise = (enterpriseId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IUpdateEnterpriseDto>(model => {
    return managementHttpService.put(`enterprises/${enterpriseId}`, model);
  });

  const handler = (model: IUpdateEnterpriseDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.setQueryData<IEnterprise | undefined>(enterpriseQueryKey(enterpriseId), input => {
          if (!input) return;

          return { ...input, ...model };
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
