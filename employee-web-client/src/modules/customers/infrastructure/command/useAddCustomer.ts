import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';

import { customersQueryKey } from '../query';
import { IAddCustomerDto } from '../../application/types';

export const useAddCustomer = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<{ customerId: string }, IAddCustomerDto>(model =>
    managementHttpService.post(`facilities/${facilityId}/customers`, model),
  );

  const handler = (model: IAddCustomerDto) => {
    return mutateAsync(model)
      .then(async res => {
        await queryClient.invalidateQueries(customersQueryKey(facilityId));
        return res.customerId;
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
