import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { offersQueryKey } from '../query';
import { IAddOfferDto, IOfferCollectionQueryParams } from '../../application/types';

export const useAddOffer = (facilityId: string) => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, IAddOfferDto>(model =>
    managementHttpService.post(`facilities/${facilityId}/offers`, model),
  );

  const handler = (model: IAddOfferDto) => {
    return mutateAsync(model)
      .then(async () => {
        await queryClient.invalidateQueries(offersQueryKey(facilityId, params));
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
