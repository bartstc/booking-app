import { useQueryClient } from 'react-query';

import { httpService } from 'utils/http-service';
import { useMutation } from 'shared/Suspense';

import { getCustomersKey } from '../query';
import { IAddCustomerDto } from '../../dto';

export const useAddCustomer = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IAddCustomerDto>(model =>
    httpService.post(`facilities/${facilityId}/customers`, model),
  );

  const handler = (model: IAddCustomerDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(getCustomersKey(facilityId)[0]);
      })
      .catch(e => {
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
