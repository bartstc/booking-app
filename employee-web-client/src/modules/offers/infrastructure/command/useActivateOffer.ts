import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { offersQueryKey } from '../query';
import { IOfferCollection, IOfferCollectionQueryParams, OfferStatus } from '../../application/types';

export const useActivateOffer = (facilityId: string, offerId: string) => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, void>(() =>
    managementHttpService.patch(`facilities/${facilityId}/offers/${offerId}/activate`),
  );

  const handler = () => {
    return mutateAsync()
      .then(async () => {
        await queryClient.setQueryData(offersQueryKey(facilityId, params), (data?: IOfferCollection) => {
          if (!data) {
            throw new Error(`Cache is empty for given key: ${offersQueryKey(facilityId, params)}`);
          }

          return {
            ...data,
            collection: data.collection.map(offer => (offer.offerId === offerId ? { ...offer, status: OfferStatus.Active } : offer)),
          };
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
