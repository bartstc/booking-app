import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';

import { getOffersKey } from '../query';
import { OfferStatus, IOfferCollection, IOfferCollectionQueryParams } from '../../types';

export const useDeactivateOffer = (facilityId: string, offerId: string) => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, void>(() =>
    managementHttpService.patch(`facilities/${facilityId}/offers/${offerId}/deactivate`),
  );

  const handler = () => {
    return mutateAsync()
      .then(async () => {
        await queryClient.setQueryData(getOffersKey(facilityId, params), (data?: IOfferCollection) => {
          if (!data) {
            throw new Error(`Cache is empty for given key: ${getOffersKey(facilityId, params)}`);
          }

          return {
            ...data,
            collection: data.collection.map(offer => (offer.offerId === offerId ? { ...offer, status: OfferStatus.Inactive } : offer)),
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
