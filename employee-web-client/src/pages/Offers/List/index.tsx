import React from 'react';
import { Grid } from '@chakra-ui/react';

import { useFacilityConsumer } from 'modules/context';
import { IOfferCollection, IOfferCollectionQueryParams } from 'modules/offers/types';
import { getOffers, getOffersKey } from 'modules/offers/infrastructure/query';

import { useInfiniteQuery } from 'hooks/useInfiniteQuery';

import { useQueryParams } from 'shared/Params';
import { InfinityList } from 'shared/InfinityList';
import { Spinner } from 'shared/Spinner';
import { EmptyState } from 'shared/States';

import { ListItem } from './ListItem';

const List = () => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const { facilityId } = useFacilityConsumer();

  const limit = 10;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(getOffersKey(facilityId, params), ({ pageParam = 0 }) => {
    return getOffers(facilityId, { ...params, limit, offset: pageParam });
  });

  if (isLoading) {
    return <Spinner size='md' />;
  }

  if (!!data?.pages && data.pages[0]?.collection.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid templateColumns='100%' w='100%' maxW='480px' mx='0 auto'>
      <InfinityList<IOfferCollection> limit={limit} data={data?.pages} next={() => fetchNextPage()} hasMore={hasNextPage ?? true}>
        {({ collection }) => (
          <>
            {collection.map(offer => (
              <ListItem key={offer.offerId} offer={offer} />
            ))}
          </>
        )}
      </InfinityList>
    </Grid>
  );
};

export { List };
