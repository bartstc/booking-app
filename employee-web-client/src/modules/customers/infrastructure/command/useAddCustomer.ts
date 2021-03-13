import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';

import { getCustomersKey } from '../query';
import { IAddCustomerDto } from '../../dto';

export const useAddCustomer = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IAddCustomerDto>(model =>
    managementHttpService.post(`facilities/${facilityId}/customers`, model),
  );

  const handler = (model: IAddCustomerDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(getCustomersKey(facilityId));
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
