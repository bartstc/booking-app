import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
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
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
