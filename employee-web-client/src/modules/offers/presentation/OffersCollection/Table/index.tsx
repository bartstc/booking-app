import React from 'react';

import { Grid, GridFooter, Skeleton } from 'shared/Grid';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { useFacilityContextSelector } from 'modules/context';
import { offersQueryKey, offersQuery } from 'modules/offers/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';
import { IOfferCollection, IOfferCollectionQueryParams } from '../../../application/types';

const Table = () => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const { facilityId } = useFacilityContextSelector();

  return (
    <FetchBoundary<IOfferCollection>
      queryKey={offersQueryKey(facilityId, params)}
      queryFn={() => offersQuery(facilityId, params)}
      options={{
        keepPreviousData: true,
      }}
      fallback={<Skeleton />}
    >
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            templateColumns={{
              base: '54px repeat(2, 1fr) max(110px)',
              md: '54px 2fr repeat(3, 1fr) max(110px)',
              lg: '54px 2fr repeat(4, 1fr) max(110px)',
            }}
            mb={4}
          >
            <Header collectionIds={collection.map(offer => offer.offerId)} />
            {collection.map(offer => (
              <Row key={offer.offerId} offer={offer} />
            ))}
          </Grid>
          <GridFooter meta={meta} collectionCount={collection.length} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
