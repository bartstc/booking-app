import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { useQueryParams } from 'shared/Params';

import { useFacilityConsumer } from 'modules/context';
import { IOfferCollection, IOfferCollectionQueryParams } from 'modules/offers/types';
import { getOffers, getOffersKey } from 'modules/offers/infrastructure/query';

import { Header } from './Header';
import { Row } from './Row';

const Table = () => {
  const { params } = useQueryParams<IOfferCollectionQueryParams>();
  const { facilityId } = useFacilityConsumer();

  return (
    <FetchBoundary<IOfferCollection> queryKey={getOffersKey(facilityId, params)} queryFn={() => getOffers(facilityId, params)}>
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            rowGap={1}
            templateColumns={{
              base: '80px repeat(2, 1fr) max(110px)',
              md: '80px 2fr repeat(3, 1fr) max(110px)',
              lg: '80px 2fr repeat(4, 1fr) max(110px)',
            }}
            mb={4}
          >
            <Header />
            {collection.map((offer, index) => (
              <Row index={index + 1} key={offer.offerId} offer={offer} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };
