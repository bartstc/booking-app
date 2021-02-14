import { useQueryClient } from 'react-query';

import { httpService } from 'utils/http-service';
import { useMutation } from 'shared/Suspense';

import { ICreateEnterpriseDto } from '../../dto';
import { getEnterpriseKey } from '../query';

export const useCreateEnterprise = (enterpriseId?: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, ICreateEnterpriseDto>(model => {
    if (enterpriseId) {
      return httpService.put(`enterprises/${enterpriseId}`, model);
    }
    return httpService.post(`enterprises`, model);
  });

  const handler = (model: ICreateEnterpriseDto) => {
    return mutateAsync(model)
      .then(async () => {
        if (!enterpriseId) return;

        await queryClient.setQueryData<ICreateEnterpriseDto | undefined>(getEnterpriseKey(enterpriseId), input => {
          if (!input) return;

          return { ...input, ...model };
        });
      })
      .catch(e => {
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
