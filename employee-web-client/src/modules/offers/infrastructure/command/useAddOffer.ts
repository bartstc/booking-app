import { useQueryClient } from 'react-query';

import { httpService } from 'utils/http';
import { useMutation } from 'shared/Suspense';

import { IAddOfferDto } from '../../dto';
import { getOffersKey } from '../query';

export const useAddOffer = (facilityId: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IAddOfferDto>(model => httpService.post(`facilities/${facilityId}/offers`, model));

  const handler = (model: IAddOfferDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(getOffersKey(facilityId));
      })
      .catch(e => {
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
