import { useQueryClient } from 'react-query';

import { useMutation } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';
import { httpService } from 'utils/http';

import { getOffersKey } from '../query';
import { OfferStatus, IOfferCollection, IOfferCollectionQueryParams } from '../../types';

export const useDeactivateOffer = (facilityId: string, offerId: string) => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation<void, void>(() =>
    httpService.patch(`facilities/${facilityId}/offers/${offerId}/deactivate`),
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
        // todo: Logger
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
